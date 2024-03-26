export function validatePeselControlDigit(pesel: string) {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let stepOneAndTwoResult = 0;

  for (let i = 0; i < 10; i++) {
    stepOneAndTwoResult += (parseInt(pesel[i], 10) * weights[i]) % 10;
  }

  const stepThreeResult = 10 - (stepOneAndTwoResult % 10);

  return stepThreeResult === parseInt(pesel[10], 10);
}

export function validatePeselBirthDate(pesel: string) {
  const birthDate = pesel.slice(0, 6);
  const birthMonth = Number(pesel.slice(2, 4));
  const birthDay = Number(pesel.slice(4, 6));
  const birthDateRegex = new RegExp(/^([0-9]{2})([0-3])([0-9])([0-3][0-9])$/);

  if (!birthMonth || birthMonth % 20 > 12) return false;

  if (!birthDay || birthDay < 1 || birthDay > 31) return false;

  return birthDateRegex.test(birthDate);
}
