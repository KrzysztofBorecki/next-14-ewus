'use client';

import { useEffect, useState } from 'react';
import { signOut } from '@/lib/auth/auth';
import { timeout } from '@/lib/utils';
import { SectionContent } from '@/components/ui/section';
import Spinner from '@/components/ui/spinner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import CheckCwuImg from '@/components/check_cwu/check-cwu-img';
import CheckCwuFileForm from '@/components/check_cwu/check-cwu-file-form';
import CheckCwuTextForm from '@/components/check_cwu/check-cwu-text-form';
import Results from '@/components/results/results';
import type { Dispatch, SetStateAction } from 'react';
import type { TInfo, TResults } from '@/components/check_cwu/types';

async function signOutOnExpiredSessionMessage(
  setMessage: Dispatch<SetStateAction<string>>,
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

export default function CheckCwu() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [signOutMessage, setSignOutMessage] = useState<string>('');
  const [results, setResults] = useState<TResults[] | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [info, setInfo] = useState<TInfo>({
    message: '',
    issues: null,
  });

  useEffect(() => {
    if (sessionExpired) {
      signOutOnExpiredSessionMessage(
        setSignOutMessage,
        'Sesja wygasła, przekierowanie na stronę logowania za',
        5000
      ).then((_) => signOut());
    }
  }, [sessionExpired]);

  return (
    <>
      <SectionContent className="py-6">
        <div className="w-full sm:max-w-md flex flex-col">
          <Tabs defaultValue="pesel" className="w-full sm:max-w-md space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pesel" disabled={sessionExpired || isPending}>
                PESEL pacjenta
              </TabsTrigger>
              <TabsTrigger value="peselList" disabled={sessionExpired || isPending}>
                Lista numerów PESEL
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pesel" className="space-y-6">
              <p className="text-s leading-relaxed">
                Zweryfikuj status ubezpieczenia pacjenta na podstawie jego numeru PESEL
              </p>
              <CheckCwuTextForm
                setResults={setResults}
                sessionExpired={sessionExpired}
                setSessionExpired={setSessionExpired}
                isPending={isPending}
                setIsPending={setIsPending}
                setInfo={setInfo}
              />
            </TabsContent>
            <TabsContent value="peselList" className="space-y-6">
              <p className="text-s leading-relaxed">
                Zweryfikuj statusy ubezpieczenia pacjentów na podstawie ich numerów PESEL
              </p>
              <CheckCwuFileForm
                setResults={setResults}
                sessionExpired={sessionExpired}
                setSessionExpired={setSessionExpired}
                isPending={isPending}
                setIsPending={setIsPending}
                setInfo={setInfo}
              />
            </TabsContent>
          </Tabs>
          {sessionExpired && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center"
               aria-live="polite"
               aria-atomic="true"
            >
              {signOutMessage}
            </p>
          )}
          {isPending && (
            <p
              aria-live="polite"
              aria-atomic="true"
              className="mt-4 p-4 bg-foreground/10 text-foreground text-center space-y-2"
            >
              Proszę czekać...
            </p>
          )}
          {!isPending && info?.message !== '' && (
            <div
              aria-live="polite"
              aria-atomic="true"
              className="mt-4 p-4 bg-foreground/10 text-foreground space-y-2"
            >
              <p className="text-center">
                {info.message}
              </p>
              {(info?.issues && info.issues.length > 0) && (
                <ul className="text-sm list-disc list-outside pl-3">
                  {info.issues.map((issue) => (
                    <li key={issue}>
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <CheckCwuImg className="hidden sm:block size-0 sm:size-80" />
      </SectionContent>
      <SectionContent className="py-6">
        {!isPending && results && (
          <Results results={results} />
        )}
        {isPending && (
          <Spinner className="stroke-muted-foreground/60 size-16" />
        )}
      </SectionContent>
    </>
  );
}
