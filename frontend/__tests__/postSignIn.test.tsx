import '@testing-library/jest-dom';
import { postSignIn } from '@/lib/http/http-methods';

const TEST_DATA = {
  postSignInInput200: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    swdId: '',
    type: '',
  },
  postSignInInput401: {
    domain: '99',
    loginEwus: 'ERROR',
    passwordEwus: 'ERROR',
    swdId: '',
    type: '',
  },
  postSignInInput404: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    swdId: '',
    type: '',
  },
  postSignInInput422: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    swdId: '',
    type: '',
  },
  postSignInInput500: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    swdId: '',
    type: '',
  },
  postSignInInput599: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    swdId: '',
    type: '',
  },
  fetchInput200Expected: [
    `${process.env.SERVER_BASE_URL}login/`,
    {
      body: JSON.stringify({
        domain: '15',
        loginEwus: 'TestEwus',
        passwordEwus: 'QwertY12#',
        swdId: '',
        type: ''
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST'
    }],
  postSignInOutput200Expected: {
    'error': false,
    'body': {
      'sessionId': 'sessionId',
      'tokenId': 'tokenId'
    },
    'message': 'message fetchResponseBody200'
  },
  postSignInOutput401Expected: {
    responseErrorMessage: 'Błąd 401: Brak dostępu - błędny login lub hasło',
    responseErrorStatus: '401'
  },
  postSignInOutput404Expected: {
    responseErrorMessage: 'Błąd 404: Nie znaleziono zasobu',
    responseErrorStatus: '404'
  },
  postSignInOutput422Expected: {
    responseErrorMessage: 'Błąd 422: Błąd walidacji',
    responseErrorStatus: '422'
  },
  postSignInOutput500Expected: {
    responseErrorMessage: 'Błąd 500: Serwer EWUŚ nie odpowiada',
    responseErrorStatus: '500'
  },
  postSignInOutput599Expected: {
    responseErrorMessage: 'Nieznany błąd 599',
    responseErrorStatus: '599'
  },
  postSignInOutputWithFetchErrorWithMessageExpected: {
    responseErrorMessage: 'fetch error',
    responseErrorStatus: 'undefined'
  },
  postSignInOutputWithFetchErrorWithoutMessageExpected: {
    responseErrorMessage: '',
    responseErrorStatus: 'undefined'
  },
  fetchResponseBody200: {
    'error': false,
    'body': {
      'sessionId': 'sessionId',
      'tokenId': 'tokenId'
    },
    'message': 'message fetchResponseBody200'
  },
  fetchResponseBody401: {
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody401'
  },
  fetchResponseBody404: {
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody404'
  },
  fetchResponseBody422: {
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody422'
  },
  fetchResponseBody500: {
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody500'
  },
  fetchResponseBody599: {
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody599'
  },
  fetchResponseInit200: {
    status: 200,
  },
  fetchResponseInit401: {
    status: 401,
  },
  fetchResponseInit404: {
    status: 404,
  },
  fetchResponseInit422: {
    status: 422,
  },
  fetchResponseInit500: {
    status: 500,
  },
  fetchResponseInit599: {
    status: 599,
  },
  getFetchResponse200: function () {
    return new Response(
      JSON.stringify(this.fetchResponseBody200),
      this.fetchResponseInit200,
    );
  },
  getFetchResponse401: function () {
    return new Response(
      JSON.stringify(this.fetchResponseBody401),
      this.fetchResponseInit401,
    );
  },
  getFetchResponse404: function () {
    return new Response(
      JSON.stringify(this.fetchResponseBody404),
      this.fetchResponseInit404,
    );
  },
  getFetchResponse422: function () {
    return new Response(
      JSON.stringify(this.fetchResponseBody422),
      this.fetchResponseInit422,
    );
  },
  getFetchResponse500: function () {
    return new Response(
      JSON.stringify(this.fetchResponseBody500),
      this.fetchResponseInit500,
    );
  },
  getFetchResponse599: function () {
    return new Response(
      JSON.stringify(this.fetchResponseBody599),
      this.fetchResponseInit599,
    );
  },
  getFetchErrorWithMessage: () => {
    throw new Error('fetch error');
  },
  getFetchErrorWithoutMessage: () => {
    throw new Error();
  },
};

describe('postSignIn()', () => {
  it('is calling fetch() correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('ok'),
      }),
    ) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput200);

    expect(fetch).toHaveBeenCalledWith(...TEST_DATA.fetchInput200Expected);
  });

  it('for fetch() response 200 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse200()),
    ) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput200);

    expect(result).toEqual(TEST_DATA.postSignInOutput200Expected);
  });

  it('for fetch() response 401 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse401()),
    ) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput401);

    expect(result).toEqual(TEST_DATA.postSignInOutput401Expected);
  });

  it('for fetch() response 404 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse404()),
    ) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput404);

    expect(result).toEqual(TEST_DATA.postSignInOutput404Expected);
  });

  it('for fetch() response 422 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse422()),
    ) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput422);

    expect(result).toEqual(TEST_DATA.postSignInOutput422Expected);
  });

  it('for fetch() response 500 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse500()),
    ) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput500);

    expect(result).toEqual(TEST_DATA.postSignInOutput500Expected);
  });

  it('for fetch() response 599 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse599()),
    ) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput599);

    expect(result).toEqual(TEST_DATA.postSignInOutput599Expected);
  });

  it('for fetch error with message returns expected data', async () => {
    global.fetch = jest.fn(() => {
      TEST_DATA.getFetchErrorWithMessage();
    }) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput200);

    expect(result).toEqual(TEST_DATA.postSignInOutputWithFetchErrorWithMessageExpected);
  });

  it('for fetch error without message returns expected data', async () => {
    global.fetch = jest.fn(() => {
      TEST_DATA.getFetchErrorWithoutMessage();
    }) as jest.Mock;

    const result = await postSignIn(TEST_DATA.postSignInInput200);

    expect(result).toEqual(TEST_DATA.postSignInOutputWithFetchErrorWithoutMessageExpected);
  });
});
