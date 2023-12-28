import Login from './login';
import { withStore } from '../../utils/Store';

const withUser = withStore((state) => ({ ...state.loginPage }));

export default withUser(Login);
