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
    console.log('PROPS', this.props);
    console.log('STATE', store.getState());
    return this.compile(template, this.props);
  }
}
