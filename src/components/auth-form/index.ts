import Block from '../../utils/Block';
import template from './auth-form.hbs';

export default class AuthForm extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
