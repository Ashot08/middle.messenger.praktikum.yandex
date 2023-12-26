import ChatAPI from '../api/ChatAPI';

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChats() {
    const chats: any = await this.api.read();
    return chats;
  }

  async addUserToChat(id: number, userId: number) {
    try {
      const result = await this.api.addUsers(id, [userId]);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUserFromChat(id: number, userId: number) {
    try {
      const result = await this.api.removeUsers(id, [userId]);
      console.log(result);
    } catch (err) {
      console.log(err);
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
}

export default new ChatController();
