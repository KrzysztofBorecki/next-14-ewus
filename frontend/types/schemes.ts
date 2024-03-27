import { z } from 'zod';
import { validatePeselControlDigit, validatePeselBirthDate } from '@/lib/pesel-validation';

export const IdAndTypeSignInSchema = z.object({
  domain: z.enum(['01', '04', '05', '06', '08', '09', '11', '12']),
  idntSwd: z.string({
    required_error: 'Proszę podać identyfikator.'
  }).trim().min(6, {
    message: 'Identyfikator musi zawierać przynajmniej 6 znaków.',
  }),
  type: z.string({
    required_error: 'Proszę wybrać typ operatora.'
  }).trim().min(1, {
    message: 'Proszę wybrać typ operatora.',
  }),
  login_ewus: z.string({
    required_error: 'Proszę podać nazwę użytkownika.'
  }).trim().min(3, {
    message: 'Nazwa użytkownika musi zawierać przynajmniej 3 znaki.',
  }),
  password_ewus: z.string({
    required_error: 'Proszę podać hasło.'
  }).trim().min(6, {
    message: 'Hasło musi zawierać przynajmniej 6 znaków.',
  }),
});

export const NoIdAndTypeSignInSchema = z.object({
  domain: z.enum(['02', '03', '07', '10', '13', '14', '15', '16']),
  idntSwd: z.string().optional(),
  type: z.string().optional(),
  login_ewus: z.string({
    required_error: 'Proszę podać nazwę użytkownika.'
  }).trim().min(3, {
    message: 'Nazwa użytkownika musi zawierać przynajmniej 3 znaki.',
  }),
  password_ewus: z.string({
    required_error: 'Proszę podać hasło.'
  }).trim().min(6, {
    message: 'Hasło musi zawierać przynajmniej 6 znaków.',
  }),
});

export const SignInSchema = z.discriminatedUnion('domain', [
  IdAndTypeSignInSchema,
  NoIdAndTypeSignInSchema,
], {
  errorMap: (_issue, _ctx) => {
    return { message: 'Proszę wybrać oddział NFZ.' };
  },
});

export const SearchSechema = z.object({
  pesel: z.string({
    required_error: 'Proszę podać number PESEL.'
  }).length(11, {
    message: 'Numer PESEL musi zawierać 11 cyfr.'
  }).refine(validatePeselBirthDate, {
    message: 'Niepoprawna data urodzenia.',
  }).refine(validatePeselControlDigit, {
    message: 'Niepoprawna cyfra kontrolna.',
  }),
});
