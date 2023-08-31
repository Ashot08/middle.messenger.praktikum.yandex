import { validation } from '../constants/validation';
export const isValid = (type, value) => {
    const reg = validation[type].regExp;
    return reg.test(value);
};
