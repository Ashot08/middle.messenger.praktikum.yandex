import registerComponent from './utils/registerComponent';
import Base from './components/layout/base';
import render from './utils/render';
import Link from './components/link';

registerComponent('Base', Base);
registerComponent('Link', Link);

window.addEventListener('DOMContentLoaded', () => {
  render('home');
});
