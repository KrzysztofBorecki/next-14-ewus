'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth/auth';
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
// __UPDATE_2FA
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from '@/components/ui/input-otp';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { SignInFormSchema } from '@/components/sign_in/schema';

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

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [domainValue, setDomainValue] = useState<string | null>(null);
  const [state, formAction] = useFormState(signIn, {
    message: '',
  });

  const form = useForm<z.output<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      domain: '',
      loginEwus: '',
      passwordEwus: '',
      swdId: '',
      type: '',
      // __UPDATE_2FA
      // token2FA: '',
    },
  });

  function onSubmit(data: z.output<typeof SignInFormSchema>) {
    startTransition(() => {
      formAction(data);
    });
  }

  useEffect(() => {
    if (shouldResetValues(domainValue)) {
      form.resetField('swdId');
      form.resetField('type');
    }
  }, [domainValue, form]);

  return (
    <Form {...form}>
      <form
        className="w-full sm:max-w-md space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <code>
          <p>domain: 15</p>
          <p>loginEwus: TestEwus</p>
          <p>passwordEwus: QwertY12#</p>
        </code>
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Oddział NFZ
              </FormLabel>
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
                  <SelectItem value="01">
                    01 - Dolnośląski - we Wrocławiu
                  </SelectItem>
                  <SelectItem value="02">
                    02 - Kujawsko-Pomorski - w Bydgoszczy
                  </SelectItem>
                  <SelectItem value="03">
                    03 - Lubelski - w Lublinie
                  </SelectItem>
                  <SelectItem value="04">
                    04 - Lubuski - w Zielonej Górze
                  </SelectItem>
                  <SelectItem value="05">
                    05 - Łódzki - w Łodzi
                  </SelectItem>
                  <SelectItem value="06">
                    06 - Małopolski - w Krakowie
                  </SelectItem>
                  <SelectItem value="07">
                    07 - Mazowiecki - w Warszawie
                  </SelectItem>
                  <SelectItem value="08">
                    08 - Opolski - w Opolu
                  </SelectItem>
                  <SelectItem value="09">
                    09 - Podkarpacki - w Rzeszowie
                  </SelectItem>
                  <SelectItem value="10">
                    10 - Podlaski - w Białymstoku
                  </SelectItem>
                  <SelectItem value="11">
                    11 - Pomorski - w Gdańsku
                  </SelectItem>
                  <SelectItem value="12">
                    12 - Śląski - w Katowicach
                  </SelectItem>
                  <SelectItem value="13">
                    13 - Świętokrzyski - w Kielcach
                  </SelectItem>
                  <SelectItem value="14">
                    14 - Warmińsko-Mazurski - w Olsztynie
                  </SelectItem>
                  <SelectItem value="15">
                    15 - Wielkopolski - w Poznaniu
                  </SelectItem>
                  <SelectItem value="16">
                    16 - Zachodniopomorski - w Szczecinie
                  </SelectItem>
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
              name="swdId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Identyfikator
                  </FormLabel>
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
                  <FormLabel>
                    Typ Operatora
                  </FormLabel>
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
                      <SelectItem value="lekarz">
                        Lekarz / Osoba personelu
                      </SelectItem>
                      <SelectItem value="swiadczeniodawca">
                        Świadczeniodawca
                      </SelectItem>
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
              name="loginEwus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Login
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Nazwa Użytkownika" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordEwus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Hasło
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*__UPDATE_2FA*/}
            {/*<FormField*/}
            {/*  control={form.control}*/}
            {/*  name="token2FA"*/}
            {/*  render={({ field }) => (*/}
            {/*    <FormItem>*/}
            {/*      <FormLabel>*/}
            {/*        Token 2FA*/}
            {/*      </FormLabel>*/}
            {/*      <FormControl>*/}
            {/*        <InputOTP maxLength={6} {...field}>*/}
            {/*          <InputOTPGroup>*/}
            {/*            <InputOTPSlot index={0} />*/}
            {/*            <InputOTPSlot index={1} />*/}
            {/*            <InputOTPSlot index={2} />*/}
            {/*            <InputOTPSeparator />*/}
            {/*            <InputOTPSlot index={3} />*/}
            {/*            <InputOTPSlot index={4} />*/}
            {/*            <InputOTPSlot index={5} />*/}
            {/*          </InputOTPGroup>*/}
            {/*        </InputOTP>*/}
            {/*      </FormControl>*/}
            {/*      <FormMessage />*/}
            {/*    </FormItem>*/}
            {/*  )}*/}
            {/*/>*/}
          </>
        )}

        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending ? (
            <div className="flex flex-row gap-3">
              Logowanie...
              <Spinner className="h-5 w-5 stroke-primary-foreground" />
            </div>
          ) : (
            'Zaloguj się'
          )}
        </Button>

        {state.message && (
          <p
            className="mt-4 p-4 bg-foreground/10 text-foreground text-center"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.message}
          </p>
        )}
      </form>
    </Form>
  );
}
