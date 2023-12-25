import BaseAPI from './BaseAPI';

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read(): Promise<unknown> {
    return this.http.get('');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}
