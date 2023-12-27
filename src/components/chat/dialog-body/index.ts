import Block from '../../../utils/Block';
import template from './dialog-body.hbs';
import './dialog-body.scss';
import DialogInput from './dialog-input';
import registerComponent from '../../../utils/registerComponent';
import UserController from '../../../controllers/UserController';
import store from '../../../utils/Store';
import ChatController from '../../../controllers/ChatController';

registerComponent('DialogInput', DialogInput);

interface IDialogBody {
  addUserToChat?: () => void;
  activeChatId: number;
  messages: any;
}

export default class DialogBody extends Block {
  constructor(props: IDialogBody) {
    super({
      ...props,
      messages: props.messages[props.activeChatId]?.map((message: any) => {
        if (message.user_id === store.getState().profile?.currentUser?.id) {
          message.isMe = true;
        }
        return message;
      }),
      async addUserToChat(e: Event) {
        e.preventDefault();
        const formData = new FormData(<HTMLFormElement>e.target);
        const login = formData.get('login') as string;
        const userId = await UserController.getUserId(login);
        if (!userId) {
          store.set('chatPage.addResponse', 'Пользователей с таким логином не найдено');
        } else {
          const result: any = await ChatController.addUserToChat(props.activeChatId, userId);
          if (result?.reason) {
            store.set('chatPage.addResponse', result.reason);
          } else {
            store.set('chatPage.addResponse', 'Пользователь успешно добавлен');
            store.getState().chatPage?.updateChatUsersList();
          }
        }
      },
      async removeUserFromChat(e: Event) {
        e.preventDefault();
        const formData = new FormData(<HTMLFormElement>e.target);
        const login = formData.get('login') as string;
        const userId = await UserController.getUserId(login);
        if (!userId) {
          store.set('chatPage.removeResponse', 'Пользователей с таким логином не найдено');
        } else {
          const result: any = await ChatController.deleteUserFromChat(props.activeChatId, userId);
          if (result?.reason) {
            store.set('chatPage.removeResponse', result.reason);
          } else {
            store.set('chatPage.removeResponse', 'Пользователь успешно удален из чата');
            store.getState().chatPage?.updateChatUsersList();
          }
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
