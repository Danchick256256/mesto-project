export default class Section {
    constructor({renderer}) {
        this.renderer = renderer;
    }

    renderAll = (items) => {
        items.forEach((item) => {
            this.addItem(item);
        });
    }

    addItem(item) {
        this.renderer(item);
    }
}