import '@testing-library/jest-dom';
import { getInsuranceStatus } from '@/lib/http/http-methods';

const TEST_DATA = {
  getInsuranceStatusInput200: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    pesel: 'pesel',
    sessionId: 'sessionId',
    tokenId: 'tokenId',
  },
  getInsuranceStatusInput401: {
    domain: '15',
    loginEwus: 'ERROR',
    passwordEwus: 'ERROR',
    pesel: 'pesel',
    sessionId: 'sessionId',
    tokenId: 'tokenId',
  },
  getInsuranceStatusInput404: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    pesel: 'pesel',
    sessionId: 'sessionId',
    tokenId: 'tokenId',
  },
  getInsuranceStatusInput422: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    pesel: 'pesel',
    sessionId: 'sessionId',
    tokenId: 'tokenId',
  },
  getInsuranceStatusInput500: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    pesel: 'pesel',
    sessionId: 'sessionId',
    tokenId: 'tokenId',
  },
  getInsuranceStatusInput599: {
    domain: '15',
    loginEwus: 'TestEwus',
    passwordEwus: 'QwertY12#',
    pesel: 'pesel',
    sessionId: 'sessionId',
    tokenId: 'tokenId',
  },
  fetchInput200Expected: [
    `${process.env.SERVER_BASE_URL}check_cwu/test/?pesel=pesel`,
    {
      headers: {
        'session-id': 'sessionId',
        'token-id': 'tokenId',
      },
      method: 'GET'
    }],
  getInsuranceStatusOutput200Expected: {
    'id': '1',
    'error': false,
    'body': {
      'status': 1,
      'patientPesel': 'patientPesel',
      'patientFirstName': 'patientFirstName',
      'patientLastName': 'patientLastName',
      'insuranceStatus': 1,
      'prescriptionSymbol': 'prescriptionSymbol',
      'vaccineCovid': 'vaccineCovid',
      'ukr': null,
      'xml': 'xml'
    },
    'message': 'message fetchResponseBody200'
  },
  getInsuranceStatusOutput401Expected: {
    responseErrorMessage: 'Błąd 401: Brak dostępu - błędny login lub hasło',
    responseErrorStatus: '401'
  },
  getInsuranceStatusOutput404Expected: {
    responseErrorMessage: 'Błąd 404: Nie znaleziono zasobu',
    responseErrorStatus: '404'
  },
  getInsuranceStatusOutput422Expected: {
    responseErrorMessage: 'Błąd 422: Błąd walidacji',
    responseErrorStatus: '422'
  },
  getInsuranceStatusOutput500Expected: {
    responseErrorMessage: 'Błąd 500: Serwer eWUŚ nie odpowiada',
    responseErrorStatus: '500'
  },
  getInsuranceStatusOutput599Expected: {
    responseErrorMessage: 'Nieznany błąd 599',
    responseErrorStatus: '599'
  },
  getInsuranceStatusOutputWithFetchErrorWithMessageExpected: {
    responseErrorMessage: 'fetch error',
    responseErrorStatus: 'undefined'
  },
  getInsuranceStatusOutputWithFetchErrorWithoutMessageExpected: {
    responseErrorMessage: '',
    responseErrorStatus: 'undefined'
  },
  fetchResponseBody200: {
    'id': '1',
    'error': false,
    'body': {
      'status': 1,
      'patientPesel': 'patientPesel',
      'patientFirstName': 'patientFirstName',
      'patientLastName': 'patientLastName',
      'insuranceStatus': 1,
      'prescriptionSymbol': 'prescriptionSymbol',
      'vaccineCovid': 'vaccineCovid',
      'ukr': null,
      'xml': 'xml'
    },
    'message': 'message fetchResponseBody200'
  },
  fetchResponseBody401: {
    'id': '1',
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody401'
  },
  fetchResponseBody404: {
    'id': '1',
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody404'
  },
  fetchResponseBody422: {
    'id': '1',
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody422'
  },
  fetchResponseBody500: {
    'id': '1',
    'error': true,
    'body': null,
    'message': 'message fetchResponseBody500'
  },
  fetchResponseBody599: {
    'id': '1',
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

describe('getInsuranceStatus()', () => {
  it('is calling fetch() correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('ok'),
      }),
    ) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput200);

    expect(fetch).toHaveBeenCalledWith(...TEST_DATA.fetchInput200Expected);
  });

  it('for fetch() response 200 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse200()),
    ) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput200);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutput200Expected);
  });

  it('for fetch() response 401 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse401()),
    ) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput401);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutput401Expected);
  });

  it('for fetch() response 404 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse404()),
    ) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput404);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutput404Expected);
  });

  it('for fetch() response 422 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse422()),
    ) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput422);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutput422Expected);
  });

  it('for fetch() response 500 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse500()),
    ) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput500);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutput500Expected);
  });

  it('for fetch() response 599 returns expected data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(TEST_DATA.getFetchResponse599()),
    ) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput599);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutput599Expected);
  });

  it('for fetch error with message returns expected data', async () => {
    global.fetch = jest.fn(() => {
      TEST_DATA.getFetchErrorWithMessage();
    }) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput200);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutputWithFetchErrorWithMessageExpected);
  });

  it('for fetch error without message returns expected data', async () => {
    global.fetch = jest.fn(() => {
      TEST_DATA.getFetchErrorWithoutMessage();
    }) as jest.Mock;

    const result = await getInsuranceStatus(TEST_DATA.getInsuranceStatusInput200);

    expect(result).toEqual(TEST_DATA.getInsuranceStatusOutputWithFetchErrorWithoutMessageExpected);
  });
});
