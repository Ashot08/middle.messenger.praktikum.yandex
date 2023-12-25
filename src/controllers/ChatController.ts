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
}

export default new ChatController();
