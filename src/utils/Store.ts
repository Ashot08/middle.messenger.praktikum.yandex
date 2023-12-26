import { set, isEqual } from './helpers';
import EventBus from './EventBus';
import Block from './Block';

export enum StoreEvents {
  Updated = 'updated',
}

interface User {
  'id': number;
  'first_name': string;
  'second_name': string;
  'display_name': string;
  'login': string;
  'email': string;
  'phone': string;
  'avatar': string;
}

interface LoginPage {
  errors?: string [];
  response?: string;
}

interface SignUpPage {
  errors?: string [];
  response?: string;
}

interface HomePage {
  errors?: string [];
}

interface ProfilePage {
  currentUser?: User,
  fields?: Record<number, string>
}

interface ChangePasswordPage {
  currentUser?: User,
  fields?: Record<number, string>
}

interface ChatPage {
  messages?: Record<string, any>;
  dialogs?: Record<string, any>;
}

interface StoreData {
  currentUser?: User;
  profile?: ProfilePage;
  changePassword?: ChangePasswordPage;
  loginPage?: LoginPage;
  signUpPage?: SignUpPage;
  homePage?: HomePage;
  chatPage?: ChatPage;
}

class Store extends EventBus {
  private state : StoreData = {};

  public getState() {
    return this.state;
  }

  public set(path: keyof StoreData | string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: StoreData) =>
  Record<string, unknown>) => (Component: typeof Block) => {
  let state: any;

  return class extends Component {
    // constructor(props: any) {
    constructor() {
      state = mapStateToProps(store.getState());
      // super(...state);
      super();
      this.setProps({
        ...state,
      });
      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
          this.setProps({
            ...newState,
          });
        }
      });
    }
  };
};
export default store;
