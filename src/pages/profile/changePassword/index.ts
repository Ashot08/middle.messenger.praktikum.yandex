import ChangePassword from './changePassword';
import { withStore } from '../../../utils/Store';

const withUser = withStore((state) => ({ ...state.changePassword }));

export default withUser(ChangePassword);
