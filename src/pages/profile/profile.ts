import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import AuthController from '../../controllers/AuthController';

export default class ProfilePage extends Block {
  constructor() {
    super({
      title: 'Регистрация',
      userName: '',
      fields: [],
      async onLogout() {
        try {
          await AuthController.LogOut();
        } catch (e) {
          throw new Error('logout error');
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
