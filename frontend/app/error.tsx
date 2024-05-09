'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SectionsContainer, SectionSecondaryHeading } from '@/components/ui/section';
import {
  Frown,
  RefreshCcw,
} from 'lucide-react';

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
        <Frown className="size-16" />
        <SectionSecondaryHeading>
          Ups! Coś poszło nie tak.
        </SectionSecondaryHeading>
        <div className="w-full sm:max-w-md">
          <Button
            className="px-2 md:px-4 w-full group"
            onClick={() => reset()}
          >
            Spróbuj ponownie
            <RefreshCcw className="ml-2 size-4 transition-transform group-hover:-rotate-180" />
          </Button>
        </div>
      </section>
    </SectionsContainer>
  );
}
