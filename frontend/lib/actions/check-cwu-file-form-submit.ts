'use server';

import { z } from 'zod';
import { getInsuranceStatus } from '@/lib/http/http-methods';
import { getSession } from '@/lib/auth/auth';
import { TextFormSchema } from '@/components/check_cwu/schema';
import type { TFormState } from '@/lib/actions/types';
import type { TSession } from '@/lib/auth/types';

function validatePeselNumbers(data: Record<string, string>[]) {
  const validationResult = data.reduce((acc: Record<string, string[]>, data: Record<string, string>) => {
    const peselNumbers = TextFormSchema.safeParse(data);
    const newAcc = { ...acc };

    if (peselNumbers.success) {
      newAcc.peselNumbers.push(data.pesel);
    } else {
      newAcc.issues.push(data.pesel);
    }

    return newAcc;
  }, {
    issues: [],
    peselNumbers: [],
  });

  if (validationResult.issues.length) return {
    success: false,
    message: 'Błąd - Niepoprawny ≥1 numer PESEL',
    issues: validationResult.issues,
    peselNumbers: null,
    sessionExpired: false,
  };

  return {
    success: true,
    message: 'Sukces - Podane numery PESEL są poprawne',
    issues: null,
    peselNumbers: validationResult.peselNumbers,
    sessionExpired: false,
  };
}

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
  data: z.output<typeof TextFormSchema>[]
): Promise<TFormState> {
  const session = await getSession();

  if (!session) return {
    message: 'Błąd - Sesja wygasła',
    issues: null,
    results: null,
    sessionExpired: true,
  };

  const validationResult = validatePeselNumbers(data);

  if (validationResult.issues) return {
    message: validationResult.message,
    issues: validationResult.issues,
    results: null,
    sessionExpired: false,
  };

  const responseData = await makeRequest(session, validationResult.peselNumbers.toString());

  if (responseData instanceof Array) {
    return {
      message: 'Sukces - Weryfikacja zakończona powodzeniem',
      issues: null,
      results: responseData,
      sessionExpired: false,
    };
  }

  return {
    message: 'Błąd - Weryfikacja zakończona niepowodzeniem',
    issues: [responseData.responseErrorMessage],
    results: null,
    sessionExpired: responseData.responseErrorStatus === '401',
  };
}
