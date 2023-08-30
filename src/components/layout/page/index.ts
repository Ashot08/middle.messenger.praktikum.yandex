import Block from '../../../utils/Block';
import template from './page.hbs';
import './page.scss';

export default class Page extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
