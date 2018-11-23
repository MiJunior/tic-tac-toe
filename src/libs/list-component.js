import { SimpleComponent } from "./simple-component";

export class ListComponent extends SimpleComponent {
    constructor(selector) {
        super(selector);
        this.items = [];
    }

    getItem(index) {
        if (typeof index !== "number")
            throw Error("getRow must have a number as an argument");
        if (index < 0 || index > this.items.length) throw Error("Out of Bounds");
        return this.items[index];
    }
}