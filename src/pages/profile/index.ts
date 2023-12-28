import ProfilePage from './profile';
import { withStore } from '../../utils/Store';

const withUser = withStore((state) => ({ ...state.profile }));

export default withUser(ProfilePage);
