'use server';

import { z } from 'zod';
import { getInsuranceStatus } from '@/lib/http/http-methods';
import { getSession } from '@/lib/auth/auth';
import { TextFormSchema } from '@/components/check_cwu/schema';
import type { TFormState } from '@/lib/actions/types';
import type { TSession } from '@/lib/auth/types';

function makeRequest(
  session: TSession,
  peselNumbers: string,
) {
  return getInsuranceStatus({
    pesel: peselNumbers,
    loginEwus: session.userSessionEwus.loginEwus,
    sessionId: session.userSessionEwus.sessionId,
    tokenId: session.userSessionEwus.tokenId,
  });
}

export async function onSubmitAction(
  _prevState: TFormState,
  data: z.output<typeof TextFormSchema>
): Promise<TFormState> {
  const session = await getSession();

  if (!session) {
    return {
      message: 'Błąd - Sesja wygasła',
      issues: null,
      results: null,
      sessionExpired: true,
    };
  }

  const parsed = TextFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Błąd - Niepoprawny numer PESEL',
      issues: parsed.error.issues.map((issue) => issue.message),
      results: null,
      fields: data,
      sessionExpired: false,
    };
  }

  const responseData = await makeRequest(session, parsed.data.pesel);

  if (responseData instanceof Array) {
    return {
      message: 'Sukces - Weryfikacja zakończona powodzeniem',
      issues: null,
      results: responseData,
      fields: parsed.data,
      sessionExpired: false,
    };
  } else {
    return {
      message: 'Błąd - Weryfikacja zakończona niepowodzeniem',
      issues: [responseData.responseErrorMessage],
      results: null,
      fields: parsed.data,
      sessionExpired: responseData.responseErrorStatus === '401',
    };
  }
}
