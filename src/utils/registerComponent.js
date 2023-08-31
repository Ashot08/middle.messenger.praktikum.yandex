import Handlebars from 'handlebars';
export default function registerComponent(name, Component) {
    if (name in Handlebars.helpers) {
        throw new Error(`The ${name} component is already registered!`);
    }
    Handlebars.registerHelper(name, function ({ hash, data, fn }) {
        const component = new Component(hash);
        const dataAttribute = `data-id="${component.id}"`;
        if ('ref' in hash) {
            (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
        }
        (data.root.__children = data.root.__children || []).push({
            component,
            embed(fragment) {
                const stub = fragment.querySelector(`[${dataAttribute}]`);
                if (!stub) {
                    return;
                }
                component.getContent()?.append(...Array.from(stub.childNodes));
                stub.replaceWith(component.getContent());
            },
        });
        const contents = fn ? fn(this) : '';
        return `<div ${dataAttribute}>${contents}</div>`;
    });
}
