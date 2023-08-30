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
      dialogs: [
        {
          title: 'Ivan Panov',
          description: 'че ниотвечаешь.?',
          avatarUrl: '/partials/chat/img/default_avatar.png',
          unreadMessagesCount: '6',
          lastMessageTime: '12:00',
        },
        {
          title: 'Семен',
          description: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n',
          avatarUrl: '/partials/chat/img/profile_photo.png',
          unreadMessagesCount: '2',
          lastMessageTime: '12:30',
        },
        {
          title: 'Сергей (риэлтор)',
          description: 'Не пиши сюда больше. Денег нет, я сейчас не в городе.',
          avatarUrl: '/partials/chat/img/default_avatar.png',
          unreadMessagesCount: '',
          lastMessageTime: 'Пт',
        },
        {
          title: 'Валентина ЖЭК',
          description: 'Когда погасите задолженность за коммуналку? На дом собираются подавать в суд из-за вас и таких как вы.',
          avatarUrl: '/partials/chat/img/default_avatar.png',
          unreadMessagesCount: '1',
          lastMessageTime: 'Ср',
        },
        {
          title: 'Илья Иванов',
          description: 'Добрый день, отклик на вакансию',
          avatarUrl: '/partials/chat/img/default_avatar.png',
          unreadMessagesCount: '',
          lastMessageTime: 'Ср',
        },
        {
          title: 'Елена Правдина',
          description: 'Здравствуйте, по вашему обращению создан тикет #345, мы с вами свяжемся, как только получим ответ от специалиста.',
          avatarUrl: '/partials/chat/img/default_avatar.png',
          unreadMessagesCount: '',
          lastMessageTime: 'Вт',
        },
      ],
      avatarDefaultUrl: 'img/default_avatar.png',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
