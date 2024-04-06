import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signOut } from '@/lib/auth';
import { verifyInsuranceStatus } from '@/lib/verify-insurance-status';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/spinner';
import { SearchSchema } from '@/types/schemes';
import type { Dispatch, SetStateAction } from 'react';
import type { TSearchResults } from '@/types/types';

function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(() => res('ok'), ms);
  });
}

async function signOutOnExpiredSessionMessage(
  setMessage: Dispatch<SetStateAction<string | null>>,
  message: string,
  ms: number
) {
  let counter = Math.floor(ms / 1000);

  for (let i = counter; i >= 0; i--) {
    setMessage(`${message} ${counter}s.`);
    await timeout(1000);
    counter--;
  }
}

export default function SearchForm({
  setSearchResults
}: {
  setSearchResults: Dispatch<SetStateAction<TSearchResults | null>>;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.output<typeof SearchSchema>) {
    const session = await getSession();

    if (!session) {
      await signOutOnExpiredSessionMessage(
        setMessage,
        'Sesja wygasła! Powrót na stronę logowania za:',
        5000
      );

      await signOut();

      return;
    }

    if (!data) {
      setMessage('Brak numeru PESEL');

      return;
    }

    setLoading(true);

    const responseData = await verifyInsuranceStatus({
      pesel: data.pesel,
      sessionId: session.userSessionEwus.sessionId,
      tokenId: session.userSessionEwus.tokenId,
    });

    if (responseData && !responseData.error) {
      setSearchResults(responseData);
    } else {
      setMessage('Nieudana próba weryfikacji wskazanego numeru PESEL.');
    }

    setLoading(false);
  }

  const form = useForm<z.output<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      pesel: '',
    },
  });

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-md py-6 space-y-6">
        <>
          <code>
            pesel: 02070803628
          </code>
          <pre>
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </>

        <FormField
          control={form.control}
          name="pesel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer PESEL pacjenta</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="11 cyfrowy numer PESEL" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" className="w-full" disabled={loading} aria-disabled={loading}>
          {loading ? (
            <div className="flex flex-row gap-3">
              Weryfikacja w toku...
              <Spinner className="h-5 w-5 stroke-primary-foreground" />
            </div>
          ) : (
            'Zweryfikuj status ubezpieczenia'
          )}
        </Button>

        {message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center" aria-live="polite" aria-atomic="true">
            {message}
          </p>
        )}
      </form>
    </Form>
  );
}
