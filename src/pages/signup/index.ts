import Block from '../../utils/Block';
import template from './signup.hbs';

export default class SignupPage extends Block {
  constructor() {
    super({
      title: 'Регистрация',
      fields: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'Почта',
          required: 'required',
        },
        {
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          required: 'required',
        },
        {
          type: 'text',
          name: 'first_name',
          placeholder: 'Имя',
          required: 'required',
        },
        {
          type: 'text',
          name: 'second_name',
          placeholder: 'Фамилия',
          required: 'required',
        },
        {
          type: 'text',
          name: 'phone',
          placeholder: 'Телефон',
          required: 'required',
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          required: 'required',
        },
        {
          type: 'password',
          name: 'password_again',
          placeholder: 'Пароль (ещё раз)',
          required: 'required',
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
