import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import ProfilePage from '../pages/profile';
import ChatPage from '../pages/chat';

const ROUTES = {
  home: HomePage,
  login: LoginPage,
  signup: SignupPage,
  profile: ProfilePage,
  chat: ChatPage,
};

export default function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
