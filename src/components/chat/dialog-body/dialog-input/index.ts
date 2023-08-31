import Block from '../../../../utils/Block';
import template from './dialog-input.hbs';
import './dialog-input.scss';
import attachImg from './img/attach.svg';
import sendImg from './img/send.svg';

export default class DialogInput extends Block {
  constructor() {
    super({
      attachImg,
      sendImg,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
