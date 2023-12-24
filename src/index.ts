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
import ChangePassword from './pages/profile/changePassword';
import ChatPage from './pages/chat';
import Error404Page from './pages/404';
import Error500Page from './pages/500';
import SignupPage from './pages/signup';
import AuthController from './controllers/AuthController';
import { Routes } from './constants/routes';

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
  router.use(Routes.Index, HomePage);
  router.use(Routes.Login, LoginPage);
  router.use(Routes.Register, SignupPage);
  router.use(Routes.ProfilePage, ProfilePage);
  router.use(Routes.ChangePasswordPage, ChangePassword);
  router.use(Routes.Chat, ChatPage);
  router.use(Routes.Error404, Error404Page);
  router.use(Routes.Error500, Error500Page);
  router.start();

  try {
    await AuthController.fetchUser();
    router.useRedirect(Routes.Login, Routes.ProfilePage);
    router.useRedirect(Routes.Register, Routes.ProfilePage);
    // console.log(user);
    if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      router.go(Routes.ProfilePage);
    }
  } catch (e: any) {
    console.log(e);
    router.go(Routes.Login);
  }
});
