import Block from '../../utils/Block';
import template from './login.hbs';

export default class LoginPage extends Block {
  constructor() {
    super(
      'div',
      {},
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
