import Block from '../../utils/Block';
import template from './link.hbs';
import render from '../../utils/render';
import './link.scss';

interface LinkProps {
  onClick?: () => void;
  withRoute?: boolean;
  events: {
    click: () => void;
  };
}
export default class Link extends Block {
  constructor(props: LinkProps) {
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
const redirectToRoute = (e: any) => { e.preventDefault(); render(e.target.getAttribute('href')); };
