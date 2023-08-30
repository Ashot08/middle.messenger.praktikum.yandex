import Block from '../../utils/Block';
import template from './auth-form.hbs';
import './auth-form.scss';

interface IAuthForm {
  onSubmit?: () => {};
  events?: {
    submit?: (e: Event) => void;
  };
}

export default class AuthForm extends Block {
  constructor(props: IAuthForm) {
    super({
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
