import Block from '../../utils/Block';
import template from './500.hbs';
import './500.scss';
export default class Error500Page extends Block {
    constructor() {
        super({
            code: 500,
            description: 'Мы уже фиксим',
            url: '/',
            text: 'Назад к чатам',
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
