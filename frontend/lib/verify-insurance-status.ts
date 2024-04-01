'use server';

export async function verifyInsuranceStatus({
  pesel,
  sessionId,
  tokenId
}: {
  pesel: string,
  sessionId: string,
  tokenId: string,
}) {
  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/check_cwu/${pesel}`,
      {
        method: 'GET',
        headers: {
          'session-id': sessionId,
          'token-id': tokenId,
        },
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
