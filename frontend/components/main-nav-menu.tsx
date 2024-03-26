'use client';

import { ThemeToggleBtn } from '@/components/theme-toggle-btn';
import SignOutBtn from '@/components/sign-out-btn';
import type { TSession } from '@/types/types';

export default function MainNavMenu({
  session
}: {
  session: TSession | null
}) {
  return (
    <ul className="flex flex-row items-center gap-4">
      <li>
        {session ? (
          <div className="flex items-center gap-4 font-medium text-foreground/60">
            <div className="flex flex-row items-center gap-2 text-sm">
              Status: Zalogowano
              <div className="aspect-square size-3 bg-statusGreen border rounded-full border-input shadow-sm"></div>
            </div>
            <SignOutBtn />
          </div>
        ) : (
          <div className="flex items-center gap-4 font-medium text-foreground/60">
            <div className="flex flex-row items-center gap-2 text-sm">
              Status: Niezalogowano
              <div className="aspect-square size-3 bg-statusRed border rounded-full border-input shadow-sm"></div>
            </div>
          </div>
        )}
      </li>
      <li>
        <ThemeToggleBtn />
      </li>
    </ul>
  );
}
