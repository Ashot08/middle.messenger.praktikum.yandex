import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router';
import Block from './Block';

describe('Router', () => {
  let TestRouter: Router;
  const backFake = sinon.fake.returns(document.createElement('div'));
  const forwardFake = sinon.fake.returns(document.createElement('div'));
  const pushStateFake = sinon.fake.returns(document.createElement('div'));
  const getContentFake = sinon.fake.returns(document.createElement('div'));
  const BlockMock = class {
    getContent = getContentFake;
  };
  global.window.history.back = backFake;
  global.window.history.forward = forwardFake;
  global.window.history.pushState = pushStateFake;
  beforeEach(() => {
    TestRouter = new Router('#app');
  });

  it('Must call Router.use()', () => {
    const result = TestRouter.use('/', BlockMock as unknown as typeof Block);
    expect(result)
      .to
      .be
      .eq(TestRouter);
  });

  it('Must call Router.back()', () => {
    TestRouter.use('/', BlockMock as unknown as typeof Block).start();
    TestRouter.back();
    expect(backFake.callCount)
      .to.be.eq(1);
  });

  it('Must call Router.forward()', () => {
    TestRouter
      .use('/', BlockMock as unknown as typeof Block)
      .start();
    TestRouter.forward();
    expect(forwardFake.callCount)
      .to.be.eq(1);
  });

  it('Must call Router.go()', () => {
    TestRouter
      .use('/', BlockMock as unknown as typeof Block)
      .start();

    TestRouter.go('/');
    expect(pushStateFake.callCount)
      .to.be.eq(1);
  });
});
