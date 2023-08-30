import Block from '../../utils/Block';
import template from './profile.hbs';
import ProfileForm from '../../components/profile-form';
import registerComponent from '../../utils/registerComponent';
import './profile.scss';

registerComponent('ProfileForm', ProfileForm);

export default class ProfilePage extends Block {
  constructor() {
    super({
      title: 'Регистрация',
      userName: 'Иван',
      fields: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'Почта',
          required: 'required',
          value: 'oleg@yandex.ru',
        },
        {
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          required: 'required',
          value: 'oleg',
        },
        {
          type: 'text',
          name: 'first_name',
          placeholder: 'Имя',
          required: 'required',
          value: 'Oleg',
        },
        {
          type: 'text',
          name: 'second_name',
          placeholder: 'Фамилия',
          required: 'required',
          value: 'Panov',
        },
        {
          type: 'text',
          name: 'display_name',
          placeholder: 'Имя в чате',
          required: 'required',
          value: 'olegus334',
        },
        {
          type: 'text',
          name: 'phone',
          placeholder: 'Телефон',
          required: 'required',
          value: '8-913-253-33-22',
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
