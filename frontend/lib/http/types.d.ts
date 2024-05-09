type TError = {
  responseErrorMessage: string;
  responseErrorStatus: string;
}

export type TCreateHttpMethod = <
  TInput extends Record<string, string>,
  TOutput
>(options: {
  method: 'GET' | 'POST';
  url: string;
}) => (input: TInput) => Promise<TOutput>;

export type TSignInInputData = {
  domain: string,
  loginEwus: string,
  passwordEwus: string,
  swdId: string,
  // __UPDATE_2FA
  // token2FA: string,
  type: string,
}

export type TSignInOutputData = {
  body: {
    sessionId: string;
    tokenId: string;
  };
  error: boolean;
  message: string;
} | TError;

export type TInsuranceInputData = {
  loginEwus: string;
  pesel: string;
  sessionId: string,
  tokenId: string,
};

export type TInsuranceOutputData = {
  body: Record<string, string | number | null | unknown[]>;
  error: boolean;
  id: string;
  message: string;
}[] | TError;
