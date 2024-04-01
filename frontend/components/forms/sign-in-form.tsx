'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/spinner';
import { SignInSchema } from '@/types/schemes';

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [domainValue, setDomainValue] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { pending } = useFormStatus();

  const form = useForm<z.output<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      domain: '',
      loginEwus: '',
      passwordEwus: '',
      type: '',
      idntSwd: '',
    },
  });

  function shouldResetValues(value: string | null) {
    if (value) {
      return ['02', '03', '07', '10', '13', '14', '15', '16'].includes(value);
    } else {
      return false;
    }
  }

  function areIdAndTypeRequired(value: string | null) {
    if (value) {
      return ['01', '04', '05', '06', '08', '09', '11', '12'].includes(value);
    } else {
      return false;
    }
  }

  function isDomainSelected(value: string | null) {
    return !!value;
  }

  useEffect(() => {
    if (shouldResetValues(domainValue)) {
      form.resetField('idntSwd');
      form.resetField('type');
    }
  }, [domainValue, form]);

  async function onSubmit(data: z.output<typeof SignInSchema>) {
    setLoading(true);

    const result = await signIn(data);

    if (result) {
      setMessage(result.message);
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-md py-6 space-y-6">
        <>
          <code>
            <p>domain: 15</p>
            <p>login_ewus: LEKARZ1</p>
            <p>password_ewus: qwerty!@#</p>
          </code>
          <pre>
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </>

        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oddział NFZ</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setDomainValue(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz oddział NFZ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="01">01 - Dolnośląski - we Wrocławiu</SelectItem>
                  <SelectItem value="02">02 - Kujawsko-Pomorski - w Bydgoszczy</SelectItem>
                  <SelectItem value="03">03 - Lubelski - w Lublinie</SelectItem>
                  <SelectItem value="04">04 - Lubuski - w Zielonej Górze</SelectItem>
                  <SelectItem value="05">05 - Łódzki - w Łodzi</SelectItem>
                  <SelectItem value="06">06 - Małopolski - w Krakowie</SelectItem>
                  <SelectItem value="07">07 - Mazowiecki - w Warszawie</SelectItem>
                  <SelectItem value="08">08 - Opolski - w Opolu</SelectItem>
                  <SelectItem value="09">09 - Podkarpacki - w Rzeszowie</SelectItem>
                  <SelectItem value="10">10 - Podlaski - w Białymstoku</SelectItem>
                  <SelectItem value="11">11 - Pomorski - w Gdańsku</SelectItem>
                  <SelectItem value="12">12 - Śląski - w Katowicach</SelectItem>
                  <SelectItem value="13">13 - Świętokrzyski - w Kielcach</SelectItem>
                  <SelectItem value="14">14 - Warmińsko-Mazurski - w Olsztynie</SelectItem>
                  <SelectItem value="15">15 - Wielkopolski - w Poznaniu</SelectItem>
                  <SelectItem value="16">16 - Zachodniopomorski - w Szczecinie</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {areIdAndTypeRequired(domainValue) && (
          <>
            <FormField
              control={form.control}
              name="idntSwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identyfikator</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Identyfikator" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ Operatora</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz Typ Operatora" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lekarz">Lekarz / Osoba personelu</SelectItem>
                      <SelectItem value="swiadczeniodawca">Świadczeniodawca</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {isDomainSelected(domainValue) && (
          <>
            <FormField
              control={form.control}
              name="login_ewus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Nazwa Użytkownika" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_ewus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" variant="default" className="w-full" disabled={pending} aria-disabled={pending}>
          {loading ? (
            <div className="flex flex-row gap-3">
              Logowanie...
              <Spinner className="h-5 w-5 stroke-primary-foreground" />
            </div>
          ) : (
            'Zaloguj się'
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
