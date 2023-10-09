export default class Section {
    constructor(sectionSelector, {renderer}) {
        this.sectionElement = document.querySelector(sectionSelector);
        this.renderer = renderer;
    }

    renderAll = (items) => {
        items.forEach((item) => {
            this.addItem(item);
        });
    }

    addItem(item) {
        this.renderer(this.sectionElement, item);
    }
}