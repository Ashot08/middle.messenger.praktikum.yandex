import Block from '../../../utils/Block';
import template from './footer.hbs';

export default class Footer extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
