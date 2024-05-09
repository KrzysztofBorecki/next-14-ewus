'use server';

import CheckCwu from '@/components/check_cwu/check-cwu';
import {
  SectionPrimaryHeading,
  SectionsContainer,
  SectionSecondaryHeading,
} from '@/components/ui/section';

export default async function Home() {
  return (
    <SectionsContainer>
      <SectionPrimaryHeading>
        Weryfikacja statusu ubezpieczenia zdrowotnego pacjenta
      </SectionPrimaryHeading>
      <SectionSecondaryHeading className="max-w-[48ch]">
        Podaj numer PESEL pacjenta lub prześlij plik CSV
      </SectionSecondaryHeading>
      <CheckCwu />
    </SectionsContainer>
  );
}
