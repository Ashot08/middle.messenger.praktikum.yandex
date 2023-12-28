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

  getChatsUsers(chatId: number): Promise<unknown> {
    return this.http.get(`/${chatId}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  removeUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId: id });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);
    return response.token;
  }

  update = undefined;

  delete = undefined;
}
