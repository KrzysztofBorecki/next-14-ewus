export type TFormState = {
  message: string;
};

export type TSession = {
  userSessionEwus: {
    loginEwus: string;
    sessionId: string;
    tokenId: string;
  };
  expires: Date;
  iat: number;
  exp: number;
};
