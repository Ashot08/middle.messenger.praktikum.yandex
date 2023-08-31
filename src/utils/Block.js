import { nanoid } from 'nanoid';
import EventBus from './EventBus';
export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };
    _element = null;
    eventBus;
    props;
    id = nanoid(6);
    children;
    refs = {};
    constructor(propsWithChildren = {}) {
        const { props, children } = this._getChildrenAndProps(propsWithChildren);
        this.props = this._makePropsProxy(props);
        this.children = children;
        this.eventBus = new EventBus();
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }
    _getChildrenAndProps(childrenAndProps) {
        const props = {};
        const children = {};
        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            }
            else {
                props[key] = value;
            }
        });
        return { props, children };
    }
    _addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount() {
    }
    dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidUpdate() {
        const response = this.componentDidUpdate();
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate() {
        return true;
    }
    setProps = (nextProps) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };
    get element() {
        return this._element;
    }
    _render() {
        const fragment = this.render();
        const newElement = fragment.firstElementChild;
        if (this._element) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }
    render() { }
    compile(template, context) {
        const contextAndStubs = { ...context, __refs: this.refs };
        const html = template(contextAndStubs);
        const temp = document.createElement('template');
        temp.innerHTML = html;
        contextAndStubs.__children?.forEach(({ embed }) => {
            embed(temp.content);
        });
        return temp.content;
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
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
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        const element = this.getContent();
        if (element) {
            element.style.display = 'block';
        }
    }
    hide() {
        const element = this.getContent();
        if (element) {
            element.style.display = 'none';
        }
    }
}
