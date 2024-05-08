import { useForm } from 'react-hook-form';
import { useCheckCwuFormState } from '@/lib/hooks/check-cwu-form-state';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession } from '@/lib/auth/auth';
import { onSubmitAction } from '@/lib/actions/check-cwu-text-form-submit';
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
import { TextFormSchema } from '@/components/check_cwu/schema';
import type {
  Dispatch,
  SetStateAction,
} from 'react';
import type {
  TInfo,
  TResults,
} from '@/components/check_cwu/types';

export default function CheckCwuTextForm({
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
  const [state, formAction] = useCheckCwuFormState<z.output<typeof TextFormSchema>>({
    onSubmitAction,
    setInfo,
    setIsPending,
    setResults,
    setSessionExpired,
  });

  async function onSubmit(data: z.output<typeof TextFormSchema>) {
    setIsPending(true);

    if (!await getSession()) {
      setSessionExpired(true);

      return;
    }

    formAction(data);
  }

  const form = useForm<z.output<typeof TextFormSchema>>({
    resolver: zodResolver(TextFormSchema),
    defaultValues: {
      pesel: '',
      ...(state?.fields ?? {}),
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full sm:max-w-md space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="pesel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Numer PESEL pacjenta
              </FormLabel>
              <FormControl>
                <Input placeholder="11 cyfrowy numer PESEL" {...field} />
              </FormControl>
              <FormDescription>
                Numer PESEL do weryfikacji statusu ubezpieczenia pacjenta
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
