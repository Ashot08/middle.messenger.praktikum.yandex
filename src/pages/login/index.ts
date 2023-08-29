import Block from '../../utils/Block';
import template from './login.hbs';
import Page from '../../components/layout/page';
import AuthForm from '../../components/auth-form';
import registerComponent from '../../utils/registerComponent';

registerComponent('Page', Page);
registerComponent('AuthForm', AuthForm);
export default class LoginPage extends Block {
  constructor() {
    super(
      {},
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
