import registerComponent from './utils/registerComponent';
import render from './utils/render';
import Base from './components/layout/base';
import Link from './components/link';
import Page from './components/layout/page';
import AuthForm from './components/auth-form';
import Input from './components/input';
import Button from './components/button';
import Error from './components/error';
import ProfileForm from './components/profile-form';

registerComponent('Input', Input);
registerComponent('Button', Button);
registerComponent('Base', Base);
registerComponent('Link', Link);
registerComponent('Page', Page);
registerComponent('AuthForm', AuthForm);
registerComponent('Error', Error);
registerComponent('ProfileForm', ProfileForm);

window.addEventListener('DOMContentLoaded', () => {
  render('home');
});
