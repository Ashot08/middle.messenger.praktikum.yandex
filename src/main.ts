import registerComponent from './utils/registerComponent';
import Base from './components/layout/base';
import render from './utils/render';
import Link from './components/link';
import Page from './components/layout/page';
import AuthForm from './components/auth-form';
import Input from './components/input';
import Button from './components/button';

registerComponent('Input', Input);
registerComponent('Button', Button);
registerComponent('Base', Base);
registerComponent('Link', Link);
registerComponent('Page', Page);
registerComponent('AuthForm', AuthForm);

window.addEventListener('DOMContentLoaded', () => {
  render('home');
});
