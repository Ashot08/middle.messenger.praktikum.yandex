import Block from '../../../../utils/Block';
import template from './dialog-input.hbs';
import './dialog-input.scss';

export default class DialogInput extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
