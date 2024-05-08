'use client';

import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

export function CheckCwuSubmitBtn({
  isPending,
  sessionExpired,
}: {
  isPending: boolean;
  sessionExpired: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="default"
      className="w-full"
      disabled={isPending || sessionExpired}
      aria-disabled={isPending || sessionExpired}
    >
      {isPending ? (
        <div className="flex flex-row gap-3">
          Weryfikacja w toku...
          <Spinner className="h-5 w-5 stroke-primary-foreground" />
        </div>
      ) : (
        'Zweryfikuj status ubezpieczenia'
      )}
    </Button>
  );
}
