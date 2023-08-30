import Block from '../../../utils/Block';
import template from './base.hbs';
import './base.scss';

export default class Base extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
