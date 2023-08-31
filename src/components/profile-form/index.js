import Block from '../../utils/Block';
import template from './profile-form.hbs';
import './profile-form.scss';
export default class ProfileForm extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
