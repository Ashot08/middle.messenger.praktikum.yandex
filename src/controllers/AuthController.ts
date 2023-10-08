import AuthAPI, { SignInData, SignUpData } from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';

export interface ControllerSignUpData extends SignUpData {
  confirm_password: string;
}

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signUp(data: ControllerSignUpData) {
    if (data.confirm_password !== data.password) {
      store.set('currentUser.error', 'Confirm password and password are not equal');
      return;
    }

    const { ...signUpData } = data;

    store.set('currentUser.isLoading', true);

    let response: any;

    try {
      response = await this.api.signUp(signUpData);
    } catch (e) {
      store.set('currentUser.error', response.reason);
      store.set('currentUser.isLoading', false);
    }

    if (response.reason) {
      store.set('currentUser.error', response.reason);
      return;
    }

    await this.fetchUser();

    const router = new Router('#app');
    router.go('/profile');
  }

  async SignIn(data: SignInData) {
    await this.api.signIn(data);

    const router = new Router('#app');

    router.go('/profile');
  }

  async LogOut() {
    await this.api.logOut();

    const router = new Router('#app');

    router.go('/signin');
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('currentUser', user);
  }
}
export default new AuthController();
