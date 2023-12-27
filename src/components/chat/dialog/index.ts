import Block from '../../../utils/Block';
import template from './dialog.hbs';
import './dialog.scss';
import defaultAvatar from '../img/profile_photo.png';
import store from '../../../utils/Store';

interface IDialog {
  id: number;
  class: string;
  active: string;
  events?: {
    click?: () => void;
  };
  updateChatUsersList: () => void;
}

export default class Dialog extends Block {
  constructor(props: IDialog) {
    super({
      ...props,
      defaultAvatar,
      events: {
        async click() {
          store.set('chatPage.activeChat', props.id);
          const dialogs = store.getState().chatPage?.dialogs;
          if (Array.isArray(dialogs)) {
            store.set('chatPage.dialogs', dialogs.map((d) => {
              if (d.id === props.id) {
                d.active = 'active';
              } else {
                d.active = '';
              }
              return d;
            }));
          }
          store.getState().chatPage?.updateChatUsersList();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
