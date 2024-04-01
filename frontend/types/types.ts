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

export type TSearchResults = Record<string, Record<string, string>>;
