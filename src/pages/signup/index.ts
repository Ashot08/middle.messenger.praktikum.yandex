import SignupPage from './signup';
import { withStore } from '../../utils/Store';

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(SignupPage);
