import registerComponent from './utils/registerComponent';
import Base from './components/layout/base';
import Link from './components/link';
import Page from './components/layout/page';
import AuthForm from './components/auth-form';
import Input from './components/input';
import Button from './components/button';
import Error from './components/error';
import ProfileForm from './components/profile-form';
import Router from './utils/Router';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import ChatPage from './pages/chat';
import Error404Page from './pages/404';
import Error500Page from './pages/500';
import SignupPage from './pages/signup';
import AuthController from './controllers/AuthController';

registerComponent('Input', Input);
registerComponent('Button', Button);
registerComponent('Base', Base);
registerComponent('Link', Link);
registerComponent('Page', Page);
registerComponent('AuthForm', AuthForm);
registerComponent('Error', Error);
registerComponent('ProfileForm', ProfileForm);
// registerComponent('HomePage', HomePage);
// registerComponent('LoginPage', LoginPage);
// registerComponent('SignupPage', SignupPage);

window.addEventListener('DOMContentLoaded', async () => {
  const router = new Router('#app');
  router.use('/', HomePage);
  router.use('/login', LoginPage);
  router.use('/signup', SignupPage);
  router.use('/profile', ProfilePage);
  router.use('/chat', ChatPage);
  router.use('/error404', Error404Page);
  router.use('/error500', Error500Page);
  router.start();

  try {
    await AuthController.fetchUser();
    if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      router.go('/profile');
    }
  } catch (e: any) {
    router.go('/login');
    throw new Error(e);
  }
});
