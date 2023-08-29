import Block from '../../utils/Block';
import template from './home.hbs';
import render from '../../utils/render';

export default class HomePage extends Block {
  constructor() {
    super(
      {
        onLinkClick: (e: any) => { e.preventDefault(); render(e.target.getAttribute('href')); },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
