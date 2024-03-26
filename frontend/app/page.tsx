'use server';

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import {
  SectionPrimaryHeading,
  SectionsContainer,
  SectionSecondaryHeading,
} from '@/components/section';
import Search from '@/components/search';

export default async function Home() {
  const session = await getSession();

  if (!session) redirect('/login');

  return (
    <SectionsContainer>
      <SectionPrimaryHeading>
        Weryfikacja statusu ubezpieczenia zdrowotnego pacjenta
      </SectionPrimaryHeading>
      <SectionSecondaryHeading className="max-w-[48ch]">
        Podaj numer PESEL pacjenta
      </SectionSecondaryHeading>
      <Search />
    </SectionsContainer>
  );
}
