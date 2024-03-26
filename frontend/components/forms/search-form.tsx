import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { peselSearch } from '@/lib/pesel-search';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/spinner';
import { SearchSechema } from '@/types/schemes';
import type { Dispatch, SetStateAction } from 'react';
import type { TSearchResults } from '@/types/types';

export default function SearchForm({
  setSearchResults
}: {
  setSearchResults: Dispatch<SetStateAction<TSearchResults | null>>;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

  async function onSubmit(data: z.output<typeof SearchSechema>) {
    setLoading(true);

    const responseData = await peselSearch(data);

    if (!responseData.detail) {
      setSearchResults(data);

    } else {
      setMessage('Nieudana próba weryfikacji wskazanego numeru PESEL.');
    }

    setLoading(false);
  }

  const form = useForm<z.output<typeof SearchSechema>>({
    resolver: zodResolver(SearchSechema),
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

        <Button type="submit" variant="default" className="w-full" disabled={pending}>
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
