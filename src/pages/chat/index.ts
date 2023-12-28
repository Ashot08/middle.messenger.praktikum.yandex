import ChatPage from './chat';
import { withStore } from '../../utils/Store';

const withUser = withStore((state) => ({ ...state.chatPage }));

export default withUser(ChatPage);
