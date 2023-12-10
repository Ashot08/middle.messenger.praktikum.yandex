import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import AuthController from '../../controllers/AuthController';
import store from '../../utils/Store';

export default class ProfilePage extends Block {
  constructor() {
    super({
      title: 'Регистрация',
      userName: '',
      fields: [],
      formClass: '',
      async onLogout() {
        try {
          await AuthController.LogOut();
        } catch (e) {
          throw new Error('logout error');
        }
      },
      async onUpdate(e: Event) {
        e.preventDefault();
        store.set('profile.formClass', 'loading');
        console.log(this);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
