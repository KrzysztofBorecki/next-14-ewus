'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  encrypt,
  decrypt,
} from '@/lib/auth/jwt';
import { SignInFormSchema } from '@/components/sign_in/schema';
import { postSignIn } from '@/lib/http/http-methods';
import type { NextRequest } from 'next/server';
import type {
  TFormState,
  TSession
} from '@/lib/auth/types';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export async function signIn(
  _prevState: TFormState,
  data: z.output<typeof SignInFormSchema>,
): Promise<TFormState> {
  const parsedFormData = SignInFormSchema.safeParse(data);

  if (!parsedFormData.success) return {
    message: 'Nieprawidłowe dane logowania',
  };

  const responseData = await postSignIn(parsedFormData.data);

  if ('body' in responseData) {
    const userSessionEwus = {
      loginEwus: data.loginEwus,
      sessionId: responseData.body.sessionId,
      tokenId: responseData.body.tokenId,
    };

    const expires = new Date(Date.now() + SESSION_TIMEOUT_MS);
    const session = await encrypt({ userSessionEwus, expires });

    cookies().set({
      name: 'session',
      value: session,
      expires,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    redirect('/');
  } else {
    return {
      message: responseData.responseErrorMessage,
    };
  }
}

export async function signOut() {
  cookies().set({
    name: 'session',
    value: '',
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  redirect('/login');
}

export async function getSession(): Promise<TSession | null> {
  const session = cookies().get('session')?.value;

  if (!session) return null;

  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session && request.url.endsWith('/')) return NextResponse.redirect(new URL('/login', request.url));
  if (!session) return;

  const parsedSession = await decrypt(session);

  parsedSession.expires = new Date(Date.now() + SESSION_TIMEOUT_MS);

  const response = request.url.endsWith('/login') ? (
    NextResponse.redirect(new URL('/', request.url))
  ) : (
    NextResponse.next()
  );

  response.cookies.set({
    name: 'session',
    value: await encrypt(parsedSession),
    expires: parsedSession.expires,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return response;
}
