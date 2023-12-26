import BaseAPI from './BaseAPI';

export interface CreateChatData {
  title: string;
}

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read(): Promise<unknown> {
    return this.http.get('');
  }

  create(data: CreateChatData): Promise<unknown> {
    return this.http.post('', data);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  removeUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId: id });
  }

  update = undefined;

  delete = undefined;
}
