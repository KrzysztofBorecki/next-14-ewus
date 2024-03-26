export type TMessage = {
  message: string;
};

export type TError = {
  detail: string;
};

export type TSessionEwus = {
  session_id: string;
  token_id: string;
};

export type TSession = {
  userSessionEwus: {
    login_ewus: string;
    session_id: string;
    token_id: string;
  };
  expires: Date;
  iat: number;
  exp: number;
};

export type TSearchResults = Record<string, string>;
