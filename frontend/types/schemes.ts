import { z } from 'zod';
import {
  hasNoProhibitedCharacters,
  validatePeselControlDigit,
  validatePeselBirthDate
} from '@/lib/validation';

export const SignInSchema = (
  z.object({
    loginEwus: z.string({
      required_error: 'Proszę podać nazwę użytkownika.'
    })
      .trim()
      .min(5, {
        message: 'Nazwa użytkownika musi zawierać przynajmniej 6 znaków.',
      })
      .max(20, {
        message: 'Nazwa użytkownika nie może zawierać więcej niż 20 znaków.',
      }),
    passwordEwus: z.string({
      required_error: 'Proszę podać hasło.'
    })
      .trim()
      .min(8, {
        message: 'Hasło musi zawierać przynajmniej 8 znaków.',
      })
      .max(20, {
        message: 'Hasło nie może zawierać więcej niż 20 znaków',
      })
      .regex(/[a-z]/, {
        message: 'Hasło musi zawierać przynajmniej 1 małą literę [a-z].',
      })
      .regex((/[A-Z]/), {
        message: 'Hasło musi zawierać przynajmniej 1 wielką literę [A-Z].',
      })
      .regex(/[0-9]/, {
        message: 'Hasło musi zawierać przynajmniej 1 cyfrę [0-9].',
      })
      .refine((value) => hasNoProhibitedCharacters(value, new RegExp(/[ą-żĄ-Ż\[\]+,:;=?|'<>.^()%]/)), {
        message: 'Hasło nie może zawierać polskich znaków i znaków specjalnych innych niż !@-_#$&* .',
      }),
    domain: z
      .string({
        required_error: 'Proszę wybrać oddział NFZ.',
      })
      .regex(/[0-1][0-6]/, {
        message: 'Proszę wybrać oddział NFZ.'
      }),
    swdId: z.string({
      required_error: 'Proszę podać identyfikator.'
    })
      .trim()
      .min(6, {
        message: 'Identyfikator musi zawierać przynajmniej 6 znaków.',
      }),
    type: z.string({
      required_error: 'Proszę wybrać typ operatora.'
    })
      .trim()
      .min(1, {
        message: 'Proszę wybrać typ operatora.',
      }),
  })
).or(
  z.object({
    loginEwus: z.string({
      required_error: 'Proszę podać nazwę użytkownika.'
    })
      .trim()
      .min(5, {
        message: 'Nazwa użytkownika musi zawierać przynajmniej 6 znaków.',
      })
      .max(20, {
        message: 'Nazwa użytkownika nie może zawierać więcej niż 20 znaków.',
      }),
    passwordEwus: z.string({
      required_error: 'Proszę podać hasło.'
    })
      .trim()
      .min(8, {
        message: 'Hasło musi zawierać przynajmniej 8 znaków.',
      })
      .max(20, {
        message: 'Hasło nie może zawierać więcej niż 20 znaków',
      })
      .regex(/[a-z]/, {
        message: 'Hasło musi zawierać przynajmniej 1 małą literę [a-z].',
      })
      .regex((/[A-Z]/), {
        message: 'Hasło musi zawierać przynajmniej 1 wielką literę [A-Z].',
      })
      .regex(/[0-9]/, {
        message: 'Hasło musi zawierać przynajmniej 1 cyfrę [0-9].',
      })
      .refine((value) => hasNoProhibitedCharacters(value, new RegExp(/[ą-żĄ-Ż\[\]+,:;=?|'<>.^()%]/)), {
        message: 'Hasło nie może zawierać polskich znaków i znaków specjalnych innych niż !@-_#$&* .',
      })
    ,
    domain: z.string({
      required_error: 'Proszę wybrać oddział NFZ.',
    })
      .regex(/02|03|07|10|13|14|15|16/, {
        message: 'Proszę wybrać oddział NFZ.'
      }),
    swdId: z.string().optional(),
    type: z.string().optional(),
  }),
);

export const SearchSchema = z.object({
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
