import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router';
import Block from './Block';

describe('Router', () => {
  let TestRouter: Router;
  let BlockMock: typeof Block;

  const backFake = sinon.fake.returns(document.createElement('div'));
  const forwardFake = sinon.fake.returns(document.createElement('div'));
  const pushStateFake = sinon.fake.returns(document.createElement('div'));
  const getContentFake = sinon.fake.returns(document.createElement('div'));
  BlockMock = class {
    getContent = getContentFake;
  };
  global.window.history.back = backFake;
  global.window.history.forward = forwardFake;
  global.window.history.pushState = pushStateFake;
  beforeEach(() => {
    TestRouter = new Router('#app');
  });

  it('Must call Router.use()', () => {
    const result = TestRouter.use('/', BlockMock);
    console.log('ONE', getContentFake.callCount);
    expect(result)
      .to
      .be
      .eq(TestRouter);
  });

  it('Must call Router.back()', () => {
    TestRouter.use('/', BlockMock).start();
    TestRouter.back();
    console.log('TWO', getContentFake.callCount);
    expect(backFake.callCount)
      .to.be.eq(1);
  });

  it('Must call Router.forward()', () => {
    TestRouter
      .use('/', BlockMock)
      .start();
    TestRouter.forward();
    console.log('THREE', getContentFake.callCount);
    expect(forwardFake.callCount)
      .to.be.eq(1);
  });

  it('Must call Router.go()', () => {
    TestRouter
      .use('/', BlockMock)
      .start();

    TestRouter.go('/');
    console.log('FOUR', getContentFake.callCount);
    expect(pushStateFake.callCount)
      .to.be.eq(1);
  });
  var olg = 2;
});
