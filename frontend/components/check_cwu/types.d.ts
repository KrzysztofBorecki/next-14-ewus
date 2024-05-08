export type TInfo = {
  message: string;
  issues: string[] | null;
}

export type TResults = {
  id: string;
  error: boolean;
  body: Record<string, string | number | null | unknown[]>;
  message: string;
}
