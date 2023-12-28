import AuthAPI, { SignInData, SignUpData } from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';
import { Routes } from '../constants/routes';
import { profileFields } from '../constants/profileFields';
import MessageController from './MessageController';

export interface ControllerSignUpData extends SignUpData {
  confirm_password: string;
}

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signUp(data: ControllerSignUpData) {
    // if (data.confirm_password !== data.password) {
    //   store.set('currentUser.error', 'Confirm password and password are not equal');
    //   return;
    // }

    data.confirm_password = data.password;
    const { ...signUpData } = data;

    store.set('currentUser.isLoading', true);

    let response: any;

    try {
      response = await this.api.signUp(signUpData);
    } catch (e: any) {
      store.set('signUpPage.response', e.reason);
    }

    if (response.reason) {
      store.set('currentUser.error', response.reason);
      return;
    }

    await this.fetchUser();

    const router = new Router('#app');
    router.go(Routes.ProfilePage);
  }

  async signIn(data: SignInData) {
    try {
      await this.api.signIn(data);
      await this.fetchUser();
      const router = new Router('#app');
      router.go(Routes.ProfilePage);
    } catch (e: any) {
      if (e.reason) {
        store.set('loginPage.response', e.reason);
      }
    }
  }

  async LogOut() {
    try {
      await this.api.logOut();
      const router = new Router('#app');
      router.removeRedirect(Routes.Login);
      router.removeRedirect(Routes.Register);
      router.go(Routes.Login);
      MessageController.closeAll();
    } catch (e) {
      throw new Error('logout error');
    }
  }

  async fetchUser() {
    const user: any = await this.api.read();
    if (user?.id) {
      store.set('profile.currentUser', user);
      store.set('profile.fields', profileFields.map((f) => ({ ...f, value: user[f.name] })));
    }
    return user;
  }
}
export default new AuthController();
