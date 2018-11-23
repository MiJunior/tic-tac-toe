export class SimpleComponent {

    constructor(selector) {
        if (!selector)
            throw Error("a SimpleComponent must be composed of a selector");
        this.selector = selector.toString();
        this.element = document.createElement(this.selector);
    }

    destroy() {
        document.body.removeChild(this.element);
    }
}