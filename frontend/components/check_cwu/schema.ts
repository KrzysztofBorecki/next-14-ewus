import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 3;
const ALLOWED_FILE_TYPES = ['text/csv', 'application/csv', 'application/vnd.ms-excel'];

function validatePeselControlDigit(pesel: string) {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let stepOneAndTwoResult = 0;

  for (let i = 0; i < 10; i++) {
    stepOneAndTwoResult += (parseInt(pesel[i], 10) * weights[i]) % 10;
  }

  const stepThreeResult = 10 - (stepOneAndTwoResult % 10);

  return stepThreeResult === parseInt(pesel[10], 10);
}

function validatePeselBirthDate(pesel: string) {
  const birthDate = pesel.slice(0, 6);
  const birthMonth = Number(pesel.slice(2, 4));
  const birthDay = Number(pesel.slice(4, 6));
  const birthDateRegex = new RegExp(/^([0-9]{2})([0-3])([0-9])([0-3][0-9])$/);

  if (!birthMonth || birthMonth % 20 > 12) return false;
  if (!birthDay || birthDay < 1 || birthDay > 31) return false;

  return birthDateRegex.test(birthDate);
}

export const TextFormSchema = z.object({
  pesel: z.string()
    .min(1, 'Proszę podać numer PESEL')
    .length(11, 'Numer PESEL musi zawierać 11 cyfr')
    .refine(validatePeselBirthDate, 'Niepoprawna data urodzenia')
    .refine(validatePeselControlDigit, 'Niepoprawna cyfra kontrolna'),
});

export const FileFormSchema = z.object({
  file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList, { message: 'Proszę załączyć plik CSV' })
    .refine((fileList) => {
      return fileList.length > 0;
    }, 'Proszę załączyć plik CSV')
    .refine((fileList) => {
      return ALLOWED_FILE_TYPES.includes(fileList[0]?.type);
    }, 'Plik musi mieć format CSV')
    .refine((fileList) => {
      return !fileList[0] || fileList[0].size > 0;
    }, 'Plik nie może być pusty')
    .refine((fileList) => {
      return !fileList[0] || fileList[0].size <= MAX_FILE_SIZE;
    }, 'Plik może mieć rozmiar <= 3MB')
});
