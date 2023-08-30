import { nanoid } from 'nanoid';
import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private eventBus: EventBus;

  protected props: object;

  public id = nanoid(6);

  public children: Record<string, Block>;

  protected refs: Record<string, Block> = {};

  constructor(propsWithChildren: object = {}) {
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.props = this._makePropsProxy(props);

    this.children = children;

    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount() {

  }

  dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(): void {
    const response = this.componentDidUpdate();
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(): boolean {
    return true;
  }

  setProps = (nextProps: any): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const fragment: DocumentFragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  render(): any {}

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs };
    const html = template(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content);
    });

    return temp.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any): object {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show() :void {
    const element = this.getContent();
    if (element) {
      element.style.display = 'block';
    }
  }

  hide(): void {
    const element = this.getContent();
    if (element) {
      element.style.display = 'none';
    }
  }
}
