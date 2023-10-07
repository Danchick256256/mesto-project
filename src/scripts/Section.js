export default class Section {
    constructor({renderer}) {
        this.renderer = renderer;
    }

    renderAll = (items) => {
        items.forEach((item) => {
            this.renderer(item);
        });
    }

    addItem(item) {
        this.renderer(item);
    }
}