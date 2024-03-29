export const validation: Record<string, any> = {
  login: {
    regExp: /^[a-zA-Z0-9_-]{3,20}$/,
    message: 'От 3 до 20 символов, латиница, без пробелов, символы: -,_',
  },

  first_name: {
    regExp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message: 'Латиница ИЛИ кириллица, первая буква заглавная, нет пробелов, цифр, символы: -',
  },

  display_name: {
    regExp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message: 'Латиница ИЛИ кириллица, первая буква заглавная, нет пробелов, цифр, символы: -',
  },

  second_name: {
    regExp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message: 'Латиница ИЛИ кириллица, первая буква заглавная, нет пробелов, цифр, символы: -',
  },

  email: {
    regExp: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
    message: 'Латиница, цифры, спецсимволы (-,_), @ и точка после неё, перед точкой буквы.',
  },

  password: {
    regExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },

  phone: {
    regExp: /^([+]{1})?[0-9]{10,15}$/,
    message: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса.',
  },

  message: {
    regExp: /(.|\s)*\S(.|\s)*/,
    message: 'Не должно быть пустым',
  },
};
