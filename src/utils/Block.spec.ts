import { expect } from 'chai';
import Handlebars from 'handlebars';
import sinon from 'sinon';
import Block from './Block';

interface Props {
  text?: string,
  events?: Record<string, () => void>
}

describe('Block', () => {
  let PageClass: typeof Block;

  before(() => {
    class Page extends Block {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      render(): string {
        const template = `<div>
                    <span id="test-text">{{text}}</span>
                </div>`;
        // @ts-ignore
        return this.compile(Handlebars.compile(template), this.props);
      }
    }

    PageClass = Page;
  });

  it('Must create component with props', () => {
    const text = 'Test';
    const pageComponent = new PageClass({ text });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('Must be reactive', () => {
    const text = 'new value';
    const pageComponent = new PageClass({ text: 'Hello' });
    pageComponent.setProps({ text });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('Must set events', () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handlerStub,
      },
    });
    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);
    // eslint-disable-next-line no-unused-expressions
    expect(handlerStub.calledOnce).to.be.true;
  });

  it('Must call componentDidMount method', () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();
    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
    const element = pageComponent.getContent();
    document.body.append(element!);
    clock.next();
    clock.restore();
    // eslint-disable-next-line no-unused-expressions
    expect(spyCDM.calledOnce).to.be.true;
  });
});
