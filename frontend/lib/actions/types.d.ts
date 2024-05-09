import { TResults } from '@/components/check_cwu/types';

export type TFormState = {
  fields?: Record<string, string>;
  issues: string[] | null;
  message: string;
  results: TResults[] | null;
  sessionExpired: boolean;
};
