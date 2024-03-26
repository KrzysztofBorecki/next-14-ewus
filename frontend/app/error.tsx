'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SectionsContainer, SectionSecondaryHeading } from '@/components/section';
import { RefreshCcw as RefreshIcon, Frown as AlertIcon } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SectionsContainer>
      <section className="flex-1 flex flex-col w-full items-center justify-center text-foreground">
        <AlertIcon className="size-16" />
        <SectionSecondaryHeading>
          Ups! Coś poszło nie tak.
        </SectionSecondaryHeading>
        <div className="w-full sm:max-w-md">
          <Button
            className="px-2 md:px-4 w-full group"
            onClick={
              () => reset()
            }
          >
            Spróbuj ponownie
            <RefreshIcon className="ml-2 size-4 transition-transform group-hover:-rotate-180" />
          </Button>
        </div>
      </section>
    </SectionsContainer>
  );
}
