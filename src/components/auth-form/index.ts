import Block from '../../utils/Block';
import template from './auth-form.hbs';
import Input from '../../components/input';
import Button from '../../components/button';
import registerComponent from '../../utils/registerComponent';

registerComponent('Input', Input);
registerComponent('Button', Button);

export default class AuthForm extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
