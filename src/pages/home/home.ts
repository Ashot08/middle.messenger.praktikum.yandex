import Block from '../../utils/Block';
import template from './home.hbs';

export default class HomePage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
