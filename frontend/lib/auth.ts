'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { encrypt, decrypt } from '@/lib/jwt';
import { z } from 'zod';
import { SignInSchema } from '@/types/schemes';
import type { TSession } from '@/types/types';
import type { NextRequest } from 'next/server';

const SESSION_TIME_MS = 30 * 60 * 1000;

async function authenticate(user: z.output<typeof SignInSchema>) {
  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/login/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
      }
    );

    if (response.ok) {
      console.log('Promise resolved and HTTP request status is successful');

      return await response.json();
    } else {
      switch (response.status) {
        case 401:
          throw new Error('401. Access Denied - Wrong Login or Password');

        case 404:
          throw new Error('404. Not found');

        case 422:
          throw new Error('422. Validation Error');

        case 500:
          throw new Error('500. EWUŚ Server Not Responding');

        default:
          throw new Error(`${response.status}`);
      }
    }
  } catch (error) {
    console.log('Fetch', error);
  }
}

export async function signIn(formData: z.output<typeof SignInSchema>) {
  const parsedFormData = SignInSchema.safeParse(formData);

  if (!parsedFormData.success) {
    return {
      message: 'Nieprawidłowe dane logowania.',
    };
  }

  const responseData = await authenticate(formData);

  if (responseData?.body.sessionId && responseData?.body.tokenId) {
    const userSessionEwus = {
      loginEwus: formData.loginEwus,
      sessionId: responseData.body.sessionId,
      tokenId: responseData.body.tokenId,
    };

    const expires = new Date(Date.now() + SESSION_TIME_MS);
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
    return (
      {
        message: 'Nieudana próba zalogowania użytkownika.'
      }
    );
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

  parsedSession.expires = new Date(Date.now() + SESSION_TIME_MS);

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
