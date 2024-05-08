'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/auth/auth';
import { buttonVariants } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

function SignOutSubmitBtn() {
  const { pending: isPending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={isPending}
      aria-disabled={isPending}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'px-2 md:px-4',
        'hover:bg-transparent hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
      )}>
      {isPending ? (
        <div className="flex flex-row gap-3">
          Wylogowywanie...
          <Spinner className="size-5 stroke-primary-foreground" />
        </div>
      ) : (
        'Wyloguj się'
      )}
    </button>
  );
}

export default function SignOutBtn() {
  return (
    <form action={signOut}>
      <SignOutSubmitBtn />
    </form>
  );
}
