import Block from '../../../utils/Block';
import template from './base.hbs';

export default class Base extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
