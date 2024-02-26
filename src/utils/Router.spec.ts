import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router';
import Block from './Block';
import Handlebars from 'handlebars';

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  let TestRouter: Router;
  let PageClass: typeof Block;

  beforeEach(() => {
    TestRouter = new Router('#app');
  });

  before(() => {
    class Page extends Block {
      constructor(props: any) {
        super({
          ...props,
        });
      }

      render(): string {
        return `<div>
                    <span id="test-text">text</span>
                </div>`;
      }
    }
    PageClass = Page;
  });

  const getContentFake = sinon.stub();
  const BlockMock = class {
    getContent = getContentFake;
  };

  it('Must call Router.use()', () => {
    const result = TestRouter.use('/', BlockMock);
    expect(result)
      .to
      .be
      .eq(TestRouter);
  });

  it('Must call Router.back()', () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();
    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
    TestRouter.use('/', PageClass).start();
    TestRouter.back();
    clock.next();
    expect(spyCDM.calledOnce).to.be.eq(true);
  });

  describe('.forward()', () => {
    it('переходит вперед', () => {
      TestRouter
        .use('/', BlockMock)
        .start();

      TestRouter.forward();

      expect(getContentFake.callCount)
        .to
        .eq(1);
    });
  });

  describe('.go()', () => {
    it('переходит по роуту', () => {
      TestRouter
        .use('/', BlockMock)
        .start();

      TestRouter.go('/');

      expect(getContentFake.callCount)
        .to
        .eq(1);
    });
  });

  it('рендер страницы', () => {
    TestRouter
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount)
      .to
      .eq(1);
  });
});
