import Block from '../../utils/Block';
import template from './button.hbs';

export default class Button extends Block {
  constructor() {
    super('div', {});
  }
  render() {
    return this.compile(template, this.props);
  }
}
