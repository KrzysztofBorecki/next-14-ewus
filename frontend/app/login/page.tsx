'use server';

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { SectionPrimaryHeading, SectionsContainer, SectionSecondaryHeading } from '@/components/section';
import SignInForm from '@/components/forms/sign-in-form';
import SignInImg from '@/components/sign-in-img';

export default async function Login() {
  const session = await getSession();

  if (session) redirect('/');

  return (
    <SectionsContainer>
      <SectionPrimaryHeading>
        Logowanie do systemu eWUŚ
      </SectionPrimaryHeading>
      <SectionSecondaryHeading>
        Wybierz oddział NFZ i uzupełnij dane logowania
      </SectionSecondaryHeading>
      <div className="flex flex-col sm:flex-row justify-around gap-10">
        <SignInForm />
        <SignInImg className="hidden sm:block size-0 sm:size-96" />
      </div>
    </SectionsContainer>
  );
}
