import Block from '../../utils/Block';
import template from './error.hbs';
import './error.scss';

export default class Error extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
