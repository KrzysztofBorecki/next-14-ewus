import { useForm } from 'react-hook-form';
import { useCheckCwuFormState } from '@/lib/hooks/check-cwu-form-state';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Papaparse from 'papaparse';
import { getSession } from '@/lib/auth/auth';
import { onSubmitAction } from '@/lib/actions/check-cwu-file-form-submit';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CheckCwuSubmitBtn } from '@/components/check_cwu/check-cwu-submit-btn';
import { TextFormSchema, FileFormSchema } from '@/components/check_cwu/schema';
import type {
  Dispatch,
  SetStateAction,
} from 'react';
import type { ParseResult } from 'papaparse';
import type {
  TInfo,
  TResults,
} from '@/components/check_cwu/types';

function validatePeselNumbers(data: Record<string, string>[]) {
  try {
    const issues = data.reduce((acc: string[], data: Record<string, string>) => {
      const result = TextFormSchema.safeParse(data);

      if (!result.success) {
        const newAcc = [...acc];

        newAcc.push(`Niepoprawny nr PESEL: ${data.pesel}`);

        return newAcc;
      } else {
        return acc;
      }
    }, []);

    if (issues.length) return {
      success: false,
      message: 'Błąd - ≥1 niepoprawny numer PESEL',
      issues,
    };

    return {
      success: true,
      message: 'Sukces - wszystkie numery PESEL są poprawne',
      issues: [],
    };
  } catch (error) {
    return {
      success: false,
      message: 'Błąd - błąd walidacji numerów PESEL',
      issues: [],
    };
  }
}

export default function CheckCwuFileForm({
  setResults,
  sessionExpired,
  setSessionExpired,
  isPending,
  setIsPending,
  setInfo,
}: {
  setResults: Dispatch<SetStateAction<TResults[] | null>>;
  sessionExpired: boolean;
  setSessionExpired: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setInfo: Dispatch<SetStateAction<TInfo>>;
}) {
  const [_, formAction] = useCheckCwuFormState<z.output<typeof TextFormSchema>[]>({
    onSubmitAction,
    setInfo,
    setIsPending,
    setResults,
    setSessionExpired,
  });

  async function onSubmit(data: z.output<typeof FileFormSchema>) {
    setIsPending(true);

    getSession().then((session) => {
      !session && setSessionExpired(true);
    });

    Papaparse.parse(data.file[0], {
      header: false,
      skipEmptyLines: true,
      complete: function (results: ParseResult<Record<string, string>>) {
        if (results.data) {
          const peselList: z.output<typeof TextFormSchema>[] = results.data.map((array) => {
            return {
              pesel: array[0]
            };
          });

          const validationResult = validatePeselNumbers(peselList);

          if (validationResult.success) {
            formAction(peselList);
          } else {
            setInfo({
              message: validationResult.message,
              issues: validationResult.issues,
            });
          }
        }
      }
    });
  }

  const form = useForm<z.output<typeof FileFormSchema>>({
    resolver: zodResolver(FileFormSchema),
  });

  const fileRef = form.register('file');

  return (
    <Form {...form}>
      <form
        className="w-full sm:max-w-md space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>
                Plik CSV z listą numerów PESEL pacjentów
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".csv"
                  placeholder="Lista numerów PESEL"
                  {...fileRef}
                />
              </FormControl>
              <FormDescription>
                Plik CSV (bez nagłówka z wartościami rozdzielanymi przecinkiem lub średnikiem) zawierający numery PESEL
                do weryfikacji statusu ubezpieczenia pacjentów
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CheckCwuSubmitBtn
          isPending={isPending}
          sessionExpired={sessionExpired}
        />
      </form>
    </Form>
  );
};
