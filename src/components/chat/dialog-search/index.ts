import Block from '../../../utils/Block';
import template from './dialog-search.hbs';
import './dialog-search.scss';

export default class DialogSearch extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
