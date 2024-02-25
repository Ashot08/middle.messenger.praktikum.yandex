import HomePage from './home';
import { withStore } from '../../utils/Store';

const withUser = withStore((state) => ({ ...state.homePage }));

export default withUser(HomePage);
