import SignupPage from './signup';
import { withStore } from '../../utils/Store';

const withUser = withStore((state) => ({ ...state.signUpPage }));

export default withUser(SignupPage);
