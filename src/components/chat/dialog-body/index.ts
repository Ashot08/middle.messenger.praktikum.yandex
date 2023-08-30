import Block from '../../../utils/Block';
import template from './dialog-body.hbs';
import './dialog-body.scss';
import DialogInput from './dialog-input';
import registerComponent from '../../../utils/registerComponent';

registerComponent('DialogInput', DialogInput);

export default class DialogBody extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
