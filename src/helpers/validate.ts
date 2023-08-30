import { validation } from '../constants/validation';

export const isValid = (type: string, value: string) => {
  const reg = validation[type].regExp;
  return reg.test(value);
};
