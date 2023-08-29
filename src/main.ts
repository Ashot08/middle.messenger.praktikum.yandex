import registerComponent from './utils/registerComponent';
import Base from './components/layout/base';
import render from './utils/render';
import Link from './components/link';
import Page from './components/layout/page';
import AuthForm from './components/auth-form';

registerComponent('Base', Base);
registerComponent('Link', Link);
registerComponent('Page', Page);
registerComponent('AuthForm', AuthForm);

window.addEventListener('DOMContentLoaded', () => {
  render('home');
});
