import Block from '../../utils/Block';
import template from './input.hbs';
import { isValid } from '../../helpers/validate';
import { validation } from '../../constants/validation';
import './input.scss';
import searchIcon from './img/search-icon.svg';

interface IInput {
  name: string;
  placeholder: string;
  type: string;
  class: string;
  onFocusOut?: () => void;
  searchIcon?: string;
  events?: {
    focusout?: (e: Event) => void;
  };
}

export default class Input extends Block {
  constructor(props: IInput) {
    super({
      ...props,
      searchIcon,
      events: {
        focusout: (e: any) => {
          const isInputValid: boolean = isValid(e.target.name, e.target.value);
          if (!isInputValid) {
            this.setProps({
              ...props,
              value: e.target.value,
              error: validation[e.target.name]?.message,
            });
          } else {
            this.setProps({
              ...props,
              value: e.target.value,
              error: '',
            });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
