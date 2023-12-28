import Block from '../../utils/Block';
import template from './form.hbs';
import './form.scss';

interface IForm {
  class: string;
  buttonLabel?: string;
  response?: string;
  onSubmit?: () => {};
  events?: {
    submit?: (e: Event) => void;
  };
}

export default class Form extends Block {
  constructor(props: IForm) {
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
