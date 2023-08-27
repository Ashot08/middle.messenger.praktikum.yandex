import Block from '../../utils/Block';
import template from './card.hbs';

export default class Card extends Block {
  constructor() {
    super('div', {});
  }
  render() {
    return this.compile(template, this.props);
  }
}
