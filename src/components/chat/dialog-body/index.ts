import Block from '../../../utils/Block';
import template from './dialog-body.hbs';
import './dialog-body.scss';

export default class DialogBody extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
