'use server';

import { getSession } from '@/lib/auth/auth';
import MainNavMenu from '@/components/navigation/main-nav-menu';
import { ShieldPlus } from 'lucide-react';

export default async function MainNav() {
  const isSignedIn = !!await getSession();

  return (
    <nav className="container flex flex-row justify-between items-center h-20">
      <div className="flex flex-row items-center gap-3">
        <ShieldPlus className="size-10" />
        <p className="hidden sm:block text-xl font-bold">
          Next-14-eWUŚ
        </p>
      </div>
      <MainNavMenu isSignedIn={isSignedIn} />
    </nav>
  );
}
