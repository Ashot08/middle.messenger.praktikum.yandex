import Block from '../../utils/Block';
import template from './profile-form.hbs';

export default class ProfileForm extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
