import Block from '../../utils/Block';
import template from './link.hbs';
import render from '../../utils/render';
import './link.scss';
export default class Link extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                click: props.withRoute ? redirectToRoute : props.onClick,
            },
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
const redirectToRoute = (e) => { e.preventDefault(); render(e.target.getAttribute('href')); };
