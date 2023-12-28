import Block from '../../utils/Block';
import template from './link.hbs';
import './link.scss';
import Router from '../../utils/Router';

interface LinkProps {
  onClick?: () => void;
  withRoute?: boolean;
  url?: string;
  events: {
    click: () => void;
  };
}
export default class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const router = new Router('#app');
          if (props.url) {
            router.go(props.url);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
