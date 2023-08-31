import Block from '../../utils/Block';
import template from './button.hbs';
import './button.scss';
export default class Button extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
