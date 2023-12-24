import Block from '../../../utils/Block';
import template from './changePassword.hbs';
import './changePassword.scss';
import UserController from '../../../controllers/UserController';

export default class ChangePassword extends Block {
  constructor() {
    super({
      title: 'Смена пароля',
      userName: '',
      fields: [
        {
          type: 'password',
          name: 'oldPassword',
          placeholder: 'Старый пароль',
          required: 'required',
          value: '',
        },
        {
          type: 'password',
          name: 'newPassword',
          placeholder: 'Новый пароль',
          required: 'required',
          value: '',
        },
      ],
      formClass: '',
      submitDisabled: false,
      response: '',

      async changePassword(e: any) {
        e.preventDefault();
        const oldPassword = (<HTMLInputElement>document.querySelector('[name="oldPassword"]'))
          .value;
        const newPassword = (<HTMLInputElement>document.querySelector('[name="newPassword"]'))
          .value;

        await UserController.updatePassword({
          oldPassword,
          newPassword,
        });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
