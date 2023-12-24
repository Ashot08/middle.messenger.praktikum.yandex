import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import AuthController from '../../controllers/AuthController';
import store from '../../utils/Store';
import { validate } from '../../helpers/validate';
import userController from '../../controllers/UserController';
import defaultAvatar from './img/default_avatar.png';

export default class ProfilePage extends Block {
  constructor() {
    super({
      title: 'Профиль',
      userName: '',
      currentUser: {},
      fields: [],
      formClass: '',
      submitDisabled: false,
      response: '',
      defaultAvatar,
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

      async changeAvatar(e: any) {
        e.preventDefault();
        const avatarInput = (<HTMLInputElement>document.querySelector('[type="file"]'));
        const file = avatarInput.files ? avatarInput.files[0] : '';
        const formData: FormData = new FormData();
        formData.append('avatar', file);
        const result = await userController.updateAvatar(formData);
        if (!result.reason) {
          await AuthController.fetchUser();
          store.set('profile.response', 'Аватар пользователя обновлен');
        } else {
          store.set('profile.response', result.reason);
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
