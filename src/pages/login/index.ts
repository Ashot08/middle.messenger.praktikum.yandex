import Block from '../../utils/Block';
import template from './login.hbs';

export default class LoginPage extends Block {
  constructor() {
    super({
      title: 'Вход',
      linkText: 'Нет аккаунта?',
      linkUrl: 'signup',
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
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
