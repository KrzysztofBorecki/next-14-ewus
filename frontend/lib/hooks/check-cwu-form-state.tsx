import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import type {
  Dispatch,
  SetStateAction,
} from 'react';
import type { TFormState } from '@/lib/actions/types';
import type {
  TInfo,
  TResults,
} from '@/components/check_cwu/types';

export function useCheckCwuFormState<TData>({
  onSubmitAction,
  setInfo,
  setIsPending,
  setResults,
  setSessionExpired,
}: {
  onSubmitAction: (
    _prevState: TFormState,
    data: TData,
  ) => Promise<TFormState>;
  setInfo: Dispatch<SetStateAction<TInfo>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setResults: Dispatch<SetStateAction<TResults[] | null>>;
  setSessionExpired: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: '',
    issues: null,
    results: null,
    sessionExpired: false,
  });

  useEffect(() => {
    if (state.sessionExpired) setSessionExpired(true);
    if (state.results) setResults(state.results);

    if (state.message || state?.issues) {
      setInfo({
        message: state.message,
        issues: (state?.issues) ? state.issues : null,
      });
    }
  }, [state, setResults, setSessionExpired, setInfo]);

  useEffect(() => {
    setIsPending(false);
  }, [state, setIsPending]);

  return [state, formAction] as const;
}
