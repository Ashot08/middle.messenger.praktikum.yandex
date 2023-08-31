import Block from '../../../utils/Block';
import template from './dialog.hbs';
import './dialog.scss';
export default class Dialog extends Block {
    render() {
        return this.compile(template, this.props);
    }
}
