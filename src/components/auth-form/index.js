import Block from '../../utils/Block';
import template from './auth-form.hbs';
import './auth-form.scss';
export default class AuthForm extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit,
            },
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
