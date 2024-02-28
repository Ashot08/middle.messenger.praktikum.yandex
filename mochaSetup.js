import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

// jsdom
// const jsdom = new JSDOM('<body></body>');

global.window = window;
global.document = window.document;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
