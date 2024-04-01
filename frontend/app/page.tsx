'use server';

import Search from '@/components/search';
import {
  SectionPrimaryHeading,
  SectionsContainer,
  SectionSecondaryHeading,
} from '@/components/section';

export default async function Home() {
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
