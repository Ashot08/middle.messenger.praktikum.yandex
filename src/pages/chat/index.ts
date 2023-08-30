import Block from '../../utils/Block';
import template from './chat.hbs';
import './chat.scss';
import Dialog from '../../components/chat/dialog';
import DialogSearch from '../../components/chat/dialog-search';
import DialogBody from '../../components/chat/dialog-body';
import DialogWarning from '../../components/chat/dialog-body/dialog-warning';
import registerComponent from '../../utils/registerComponent';

registerComponent('Dialog', Dialog);
registerComponent('DialogSearch', DialogSearch);
registerComponent('DialogBody', DialogBody);
registerComponent('DialogWarning', DialogWarning);
export default class ChatPage extends Block {
  constructor() {
    super({
      hasActive: true,
      hasMessages: true,
      messages: [
        {
          from: 'Семен',
          date: '03.02.2012',
          time: '12:01',
          message: 'Займи до среды 2000',
        },
        {
          from: 'Семен',
          date: '03.02.2012',
          time: '12:30',
          message: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. ',
        },
        {
          isMe: true,
          from: 'Me',
          date: '03.02.2012',
          time: '12:31',
          message: 'Привет, не понял',
        },
      ],
      dialogs: [
        {
          active: false,
          title: 'Ivan Panov',
          description: 'че ниотвечаешь.?',
          avatarUrl: '/components/chat/img/default_avatar.png',
          unreadMessagesCount: '6',
          lastMessageTime: '12:00',
        },
        {
          active: true,
          title: 'Семен',
          description: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. ',
          avatarUrl: '/components/chat/img/profile_photo.png',
          unreadMessagesCount: '',
          lastMessageTime: '12:30',
        },
        {
          active: false,
          title: 'Сергей (риэлтор)',
          description: 'Не пиши сюда больше. Денег нет, я сейчас не в городе.',
          avatarUrl: '/components/chat/img/default_avatar.png',
          unreadMessagesCount: '',
          lastMessageTime: 'Пт',
        },
        {
          active: false,
          title: 'Валентина ЖЭК',
          description: 'Когда погасите задолженность за коммуналку?',
          avatarUrl: '/components/chat/img/default_avatar.png',
          unreadMessagesCount: '1',
          lastMessageTime: 'Ср',
        },
        {
          active: false,
          title: 'Илья Иванов',
          description: 'Добрый день, отклик на вакансию',
          avatarUrl: '/components/chat/img/default_avatar.png',
          unreadMessagesCount: '',
          lastMessageTime: 'Ср',
        },
        {
          active: false,
          title: 'Елена Правдина',
          description: 'Здравствуйте, по вашему обращению создан тикет #345, мы с вами свяжемся',
          avatarUrl: '/components/chat/img/default_avatar.png',
          unreadMessagesCount: '',
          lastMessageTime: 'Вт',
        },
      ],
      avatarDefaultUrl: '/components/chat/img/default_avatar.png',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
