import ChatAPI from '../api/ChatAPI';
import MessageController from './MessageController';

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChats() {
    const chats: any = await this.api.read();

    chats.map(async (chat: any) => {
      const token: string = await this.getToken(chat.id) as string;
      if (token) {
        await MessageController.connect(chat.id, token);
      }
    });
    return chats;
  }

  async getChatsUsers(chatId: number) {
    const users: any = await this.api.getChatsUsers(chatId);
    return users;
  }

  async addUserToChat(id: number, userId: number) {
    try {
      const result = await this.api.addUsers(id, [userId]);
      return result;
    } catch (err) {
      return err;
    }
  }

  async deleteUserFromChat(id: number, userId: number) {
    try {
      const result = await this.api.removeUsers(id, [userId]);
      return result;
    } catch (err) {
      return err;
    }
  }

  async createChat(title: string) {
    try {
      const result = await this.api.create({ title });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  getToken(id: number) {
    try {
      return this.api.getToken(id);
    } catch (err) {
      return err;
    }
  }
}

export default new ChatController();
