'use server';

import { getSession } from '@/lib/auth';
import MainNavMenu from '@/components/main-nav-menu';
import { ShieldPlus } from 'lucide-react';

export default async function MainNav() {
  const session = await getSession();

  return (
    <nav className="flex flex-row justify-around items-center h-20">
      <div className="flex flex-row items-center gap-3">
        <ShieldPlus className="size-10" />
        <p className="hidden sm:block text-xl font-bold">Next-14-eWUŚ</p>
      </div>
      <MainNavMenu session={session} />
    </nav>
  );
}
