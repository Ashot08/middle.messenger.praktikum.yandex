import Block from '../../utils/Block';
import template from './input.hbs';
import { isValid } from '../../helpers/validate';
import { validation } from '../../constants/validation';
import './input.scss';
export default class Input extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                focusout: (e) => {
                    const isInputValid = isValid(e.target.name, e.target.value);
                    if (!isInputValid) {
                        this.setProps({
                            ...props,
                            value: e.target.value,
                            error: validation[e.target.name]?.message,
                        });
                    }
                    else {
                        this.setProps({
                            ...props,
                            value: e.target.value,
                            error: '',
                        });
                    }
                },
            },
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
