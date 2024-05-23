'use server';

import {
  TCreateHttpMethod,
  TInsuranceInputData,
  TInsuranceOutputData,
  TSignInInputData,
  TSignInOutputData,
} from '@/lib/http/types';

const get = async (
  url: string,
  input: Record<string, string>,
) => {
  const test = input.loginEwus === 'TestEwus' ? 'test/' : '';

  return fetch(
    `${url}${test}?pesel=${input.pesel}`,
    {
      method: 'GET',
      headers: {
        'session-id': input.sessionId,
        'token-id': input.tokenId,
      },
    }
  );
};

const post = async (
  url: string,
  input: Record<string, string>,
) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  });
};

function checkError(status: number) {
  switch (status) {
    case 401:
      throw new Error('Błąd 401: Brak dostępu - błędny login lub hasło', { cause: status });

    case 404:
      throw new Error('Błąd 404: Nie znaleziono zasobu', { cause: status });

    case 422:
      throw new Error('Błąd 422: Błąd walidacji', { cause: status });

    case 500:
      throw new Error('Błąd 500: Serwer eWUŚ nie odpowiada', { cause: status });

    default:
      throw new Error(`Nieznany błąd ${status}`, { cause: status });
  }
}

const createHttpMethod: TCreateHttpMethod = (options) => {
  return async (input) => {
    const method = options.method === 'GET' ? get : post;

    try {
      const response = await method(options.url, input);

      if (response.ok) {
        return await response.json();
      } else {
        checkError(response.status);
      }
    } catch (error) {
      return {
        responseErrorStatus: error instanceof Error && error.hasOwnProperty('cause') ? String(error.cause) : 'Brak',
        responseErrorMessage: error instanceof Error ? error.message : 'Nieznany błąd',
      };
    }
  };
};

export const postSignIn = createHttpMethod<
  TSignInInputData,
  TSignInOutputData
>({
  method: 'POST',
  url: `${process.env.SERVER_BASE_URL}login/`,
});

export const getInsuranceStatus = createHttpMethod<
  TInsuranceInputData,
  TInsuranceOutputData
>({
  method: 'GET',
  url: `${process.env.SERVER_BASE_URL}check_cwu/`,
});
