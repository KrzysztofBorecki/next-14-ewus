'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/auth';
import { buttonVariants } from '@/components/ui/button';
import Spinner from '@/components/spinner';

export default function SignOutBtn() {
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

  async function onSubmit() {
    setLoading(true);
    await signOut();
    setLoading(false);
  }

  return (
    <form action={(onSubmit)}>
      <button
        type="submit"
        disabled={pending}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'px-2 md:px-4',
          'hover:bg-transparent hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
        )}>
        {loading ? (
          <div className="flex flex-row gap-3">
            Wylogowywanie...
            <Spinner className="size-5 stroke-primary-foreground" />
          </div>
        ) : (
          'Wyloguj się'
        )}
      </button>
    </form>
  );
}
