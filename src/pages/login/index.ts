import Block from '../../utils/Block';
import template from './login.hbs';
import { isValid } from '../../helpers/validate';
import './login.scss';
import { validation } from '../../constants/validation';

export default class LoginPage extends Block {
  constructor() {
    super({
      title: 'Вход',
      linkText: 'Нет аккаунта?',
      linkUrl: '/signup',
      buttonLabel: 'Войти',
      fields: [
        {
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          required: 'required',
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          required: 'required',
        },
      ],
      onSubmit: (e: any) => {
        e.preventDefault();
        const formData: any = new FormData(e.target);
        let oldProps:any = {};
        for (const pair of formData.entries()) {
          const isInputValid = isValid(pair[0], pair[1]);
          oldProps = { ...this.props };
          for (const field of oldProps.fields) {
            if (!isInputValid && field.name === pair[0]) {
              field.error = validation[pair[0]].message;
              field.value = pair[1];
            }
            if (isInputValid && field.name === pair[0]) {
              field.error = '';
              field.value = pair[1];
            }
          }
        }
        console.log(oldProps.fields.map((f: any) => `${f.name}: ${f.value}`));
        this.setProps({
          ...oldProps,
          fields: [...oldProps.fields],
        });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
