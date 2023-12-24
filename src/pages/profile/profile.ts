import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import AuthController from '../../controllers/AuthController';
import store from '../../utils/Store';
import { validate } from '../../helpers/validate';
import userController from '../../controllers/UserController';

export default class ProfilePage extends Block {
  constructor() {
    super({
      title: 'Профиль',
      userName: '',
      fields: [],
      formClass: '',
      submitDisabled: false,
      response: '',
      async onLogout() {
        try {
          await AuthController.LogOut();
        } catch (e) {
          throw new Error('logout error');
        }
      },
      async onUpdate(e: Event) {
        e.preventDefault();
        const formData: any = new FormData(e.target as HTMLFormElement);
        const isFormValid = validate(formData);
        if (!isFormValid) {
          console.log('Form not valid');
        } else {
          const userData: any = {
            first_name: '',
            second_name: '',
            display_name: '',
            login: '',
            email: '',
            phone: '',
          };

          for (const name of Object.keys(userData)) {
            userData[name] = formData.get(name);
          }

          store.set('profile.formClass', 'loading');
          store.set('profile.submitDisabled', true);
          const result = await userController.update(userData);
          store.set('profile.formClass', '');
          store.set('profile.submitDisabled', false);
          if (!result.reason) {
            await AuthController.fetchUser();
            store.set('profile.response', 'Данные пользователя обновлены');
          } else {
            store.set('profile.response', result.reason);
          }
        }
      },

      async changePassword(e: any) {
        e.preventDefault();
        const oldPassword = (<HTMLInputElement>document.querySelector('[name="oldPassword"]'))
          .value;
        const newPassword = (<HTMLInputElement>document.querySelector('[name="newPassword"]'))
          .value;

        if (oldPassword !== newPassword) {
          store.set('profile.response', 'Пароли не совпадают');
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
