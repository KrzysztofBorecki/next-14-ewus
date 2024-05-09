'use server';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import {
  SectionsContainer,
  SectionSecondaryHeading,
} from '@/components/ui/section';
import { Frown } from 'lucide-react';

export default async function NotFound() {
  return (
    <SectionsContainer>
      <section className="flex-1 flex flex-col w-full items-center justify-center text-foreground">
        <Frown className="size-16" />
        <SectionSecondaryHeading>
          404 - Strona o podanym adresie nie istnieje.
        </SectionSecondaryHeading>
        <div className="w-full sm:max-w-md">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full group'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Wróć na stronę startową
          </Link>
        </div>
      </section>
    </SectionsContainer>
  );
}
