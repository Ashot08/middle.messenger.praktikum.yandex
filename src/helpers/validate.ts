import { validation } from '../constants/validation';

export const isValid = (type: string, value: any) => {
  const reg = validation[type]?.regExp;
  return reg?.test(value);
};

export const validate = (formData: FormData) => {
  for (const pair of formData.entries()) {
    const isInputValid = isValid(pair[0], pair[1]);
    if (!isInputValid) {
      console.log(pair[0], pair[1]);
      return false;
    }
  }
  return true;
};
