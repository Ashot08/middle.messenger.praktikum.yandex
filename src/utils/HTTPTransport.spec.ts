import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';
import { Config } from '../constants/config';

describe('HTTPTransport', () => {
  let xhr: any;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr;
    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/test');
  });

  afterEach(() => {
    requests = [];
  });

  it('Must send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.be.eq('Get');
  });

  it('Must send POST request', () => {
    instance.post('/user');

    const [request] = requests;

    expect(request.method).to.be.eq('Post');
  });

  it('Must send DELETE request', () => {
    instance.delete('/user', '');

    const [request] = requests;

    expect(request.method).to.be.eq('Delete');
  });

  it('Must send PATCH request', () => {
    instance.patch('/user', '');

    const [request] = requests;

    expect(request.method).to.be.eq('Patch');
  });

  it('Must send PUT request', () => {
    instance.put('/user', '');

    const [request] = requests;

    expect(request.method).to.be.eq('Put');
  });

  it('Must set query params on GET', () => {
    instance.get('/user', { a: 4, b: 5 });

    const [request] = requests;
    const url = `${Config.HOST}/test/user?a=4&b=5`;
    expect(request.url).to.be.eq(url);
  });
});
