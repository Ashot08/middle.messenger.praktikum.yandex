import Block from '../../utils/Block';
import template from './404.hbs';
import './404.scss';
export default class Error404Page extends Block {
    constructor() {
        super({
            code: 404,
            description: 'Не туда попали',
            url: '/',
            text: 'Назад к чатам',
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
