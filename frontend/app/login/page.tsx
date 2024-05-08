'use server';

import {
  SectionContent,
  SectionPrimaryHeading,
  SectionsContainer,
  SectionSecondaryHeading,
} from '@/components/ui/section';
import SignInForm from '@/components/sign_in/sign-in-form';
import SignInImg from '@/components/sign_in/sign-in-img';

export default async function Login() {
  return (
    <SectionsContainer>
      <SectionPrimaryHeading>
        Logowanie do systemu eWUŚ
      </SectionPrimaryHeading>
      <SectionSecondaryHeading>
        Wybierz oddział NFZ i uzupełnij dane logowania
      </SectionSecondaryHeading>
      <SectionContent className="py-6">
        <SignInForm />
        <SignInImg className="hidden sm:block size-0 sm:size-96" />
      </SectionContent>
    </SectionsContainer>
  );
}
