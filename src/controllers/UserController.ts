import UserAPI, { PasswordData, UserData } from '../api/UserAPI';
import store from '../utils/Store';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async update(data: UserData) {
    store.set('currentUser.isLoading', true);

    let response: any;

    try {
      response = await this.api.update(data);
    } catch (e: any) {
      store.set('profilePage.response', e.reason);
    }

    if (response.reason) {
      store.set('currentUser.error', response.reason);
    }
    return response;
  }

  async updatePassword(data: PasswordData) {
    let response: any;

    try {
      response = await this.api.updatePassword(data);
    } catch (e: any) {
      store.set('changePassword.response', e.reason);
      return e.reason;
    }
    store.set('changePassword.response', 'Пароль успешно заменен');
    return response;
  }

  async updateAvatar(data: any) {
    let response: any;

    try {
      response = await this.api.updateAvatar(data);
    } catch (e: any) {
      store.set('profilePage.response', e.reason);
      return e.reason;
    }
    store.set('profilePage.response', 'Аватар успешно заменен');
    return response;
  }
}

export default new UserController();
