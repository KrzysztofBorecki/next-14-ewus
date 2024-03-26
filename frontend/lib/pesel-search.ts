'use server';

import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { SearchSechema } from '@/types/schemes';

export async function peselSearch(data: z.output<typeof SearchSechema>) {
  const session = await getSession();

  if (!session) {
    return {
      detail: 'Sesja wygasła',
    };
  }

  const searchBody = {
    session_id: session.userSessionEwus.session_id,
    token_id: session.userSessionEwus.token_id,
    pesel: data.pesel,
  };

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/check_cwu/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(searchBody),
      }
    );

    if (response.ok) {
      console.log('Promise resolved and HTTP request status is successful');

      return await response.json();
    } else {
      switch (response.status) {
        case 400:
          throw new Error('404. Not found');

        case 500:
          throw new Error('500. internal server error');

        default:
          throw new Error(`${response.status}`);
      }
    }
  } catch (error) {
    console.log('Fetch', error);
  }
}
