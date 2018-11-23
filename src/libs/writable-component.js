import { SimpleComponent } from "./simple-component";

export class WritableComponent extends SimpleComponent {
    constructor(selector) {
        super(selector);
    }
    get textContent() {
        return this.element.textContent;
    }

    set textContent(v) {
        return (this.element.textContent = v);
    }
}