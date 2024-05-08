'use server';

import Spinner from '@/components/ui/spinner';

export default async function Loading() {
  return (
    <div className="flex-1 flex flex-col w-full items-center justify-center gap-4">
      <Spinner className="stroke-muted-foreground/60 size-16" />
      <p className="text-muted-foreground/60 text-sm">
        Ładowanie...
      </p>
    </div>
  );
}
