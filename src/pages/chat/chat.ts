import Block from '../../utils/Block';
import template from './chat.hbs';
import './chat.scss';
import Dialog from '../../components/chat/dialog';
import DialogSearch from '../../components/chat/dialog-search';
import DialogBody from '../../components/chat/dialog-body';
import DialogWarning from '../../components/chat/dialog-body/dialog-warning';
import registerComponent from '../../utils/registerComponent';
import defaultAvatar from '../../components/chat/img/default_avatar.png';
import ChatController from '../../controllers/ChatController';
import store from '../../utils/Store';

registerComponent('Dialog', Dialog);
registerComponent('DialogSearch', DialogSearch);
registerComponent('DialogBody', DialogBody);
registerComponent('DialogWarning', DialogWarning);

export default class ChatPage extends Block {
  constructor() {
    super({
      hasActive: true,
      hasMessages: true,
      activeChat: '',
      addResponse: '',
      removeResponse: '',
      messages: [
        {
          from: 'Загрузка...',
          date: '',
          time: '',
          message: '',
        },
        // {
        //   from: 'Семен',
        //   date: '03.02.2012',
        //   time: '12:01',
        //   message: 'Займи до среды 2000',
        // },
        // {
        //   from: 'Семен',
        //   date: '03.02.2012',
        //   time: '12:30',
        //   message: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. ',
        // },
        // {
        //   isMe: true,
        //   from: 'Me',
        //   date: '03.02.2012',
        //   time: '12:31',
        //   message: 'Привет, не понял',
        // },
      ],
      chatMembers: [],
      dialogs: [
        {
          active: false,
          title: 'Загрузка...',
          description: '',
          avatarUrl: defaultAvatar,
          unreadMessagesCount: '',
          lastMessageTime: '',
        },
      ],
      avatarDefaultUrl: defaultAvatar,
      async createChat(e: Event) {
        e.preventDefault();
        const title = (<HTMLInputElement>document.querySelector('[name="title"]')).value;
        if (title) {
          await ChatController.createChat(title);
          const chats = await ChatController.getChats();
          store.set('chatPage.dialogs', chats);
        }
      },
    });
  }

  async componentDidMount() {
    // super.componentDidMount();
    const chats = await ChatController.getChats();
    store.set('chatPage.dialogs', chats);
    store.set('chatPage.updateChatUsersList', updateChatUsersList);
    async function updateChatUsersList() {
      const chatId = store.getState().chatPage?.activeChat;
      if (chatId) {
        const chatsUsers = await ChatController.getChatsUsers(chatId as number);
        store.set('chatPage.chatMembers', chatsUsers);
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
