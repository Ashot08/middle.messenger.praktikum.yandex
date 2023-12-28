import Block from '../../../../utils/Block';
import template from './dialog-input.hbs';
import './dialog-input.scss';
import attachImg from './img/attach.svg';
import sendImg from './img/send.svg';
import MessageController from '../../../../controllers/MessageController';
import store from '../../../../utils/Store';

export default class DialogInput extends Block {
  constructor() {
    super({
      attachImg,
      sendImg,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const formData = new FormData(<HTMLFormElement> e.target);
          const message = formData.get('message');
          if (message) {
            MessageController
              .sendMessage(store.getState().chatPage?.activeChat as number, message as string);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
