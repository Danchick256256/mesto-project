import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, handlerSubmmitForm) {
        super(popupSelector);
        this.handlerSubmmitForm = handlerSubmmitForm;
        this.popupForm = this.popupSelector.querySelector('.form');
        this.inputList = this.popupForm.querySelectorAll('.popup__item')
    }
    _getInputValues() {
        this._inputsValues = {};// сюда будут поступать значение инпутов
        this.inputList.forEach(input => {
            this._inputsValues[input.name] = input.value;
        })
        return this._inputsValues
    }
    setEventListeners() {

    }
    close() {
        super.close();
        this.popupForm.reset();
    }
}
