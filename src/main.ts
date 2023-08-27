import Button from './components/button';
import registerComponent from './utils/registerComponent';
import Card from './components/card';
import render from './utils/render';

registerComponent('Button', Button);
registerComponent('Card', Card);

window.addEventListener('DOMContentLoaded', () => {
  render('home');
});
