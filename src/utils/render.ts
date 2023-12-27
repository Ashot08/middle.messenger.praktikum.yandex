import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import ProfilePage from '../pages/profile';
import ChatPage from '../pages/chat';
import Error500Page from '../pages/500';
import Error404Page from '../pages/404';

const ROUTES = {
  home: HomePage,
  login: LoginPage,
  signup: SignupPage,
  profile: ProfilePage,
  chat: ChatPage,
  error500: Error500Page,
  error404: Error404Page,
};

export default function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
