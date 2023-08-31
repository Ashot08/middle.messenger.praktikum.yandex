import Block from '../../../../utils/Block';
import template from './dialog-warning.hbs';
import './dialog-warning.scss';
export default class DialogWarning extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
