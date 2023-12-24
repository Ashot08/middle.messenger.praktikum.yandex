import Block from '../../utils/Block';
import template from './profile-form.hbs';
import './profile-form.scss';

export default class ProfileForm extends Block {
  constructor(props: any) {
    super({
      onChangeInput: 'null',
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
