'use client';

import SignOutBtn from '@/components/navigation/sign-out-btn';
import ThemeToggleBtn from '@/components/themes/theme-toggle-btn';

export default function MainNavMenu({
  isSignedIn
}: {
  isSignedIn: boolean
}) {
  return (
    <ul className="flex flex-row items-center gap-4">
      <li>
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <p className="font-medium text-foreground/60 text-sm">
                Status: Zalogowano
              </p>
              <div className="aspect-square size-3 bg-statusGreen border rounded-full border-input shadow-sm"></div>
            </div>
            <SignOutBtn />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center gap-2 text-sm">
              <p className="font-medium text-foreground/60 text-sm">
                Status: Niezalogowano
              </p>
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
