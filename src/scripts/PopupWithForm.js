import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, handlerSubmitForm) {
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this.popupForm = this.popupElement.querySelector('.form');
        this.inputList = this.popupForm.querySelectorAll('.popup__item');
        this.setEventListeners();
    }
    _getInputValues() {
        this._inputsValues = {};// сюда будут поступать значение инпутов
        this.inputList.forEach(input => {
            this._inputsValues[input.name] = input.value;
        })
        return this._inputsValues
    }
    setEventListeners() {
        super.setEventListeners();
        this.popupForm.addEventListener('submit', (evt) => { 
            evt.preventDefault();
            const formValues = this._getInputValues(); // Получаем значения полей формы
            this._handlerSubmitForm(this) //та функция которая нужна попапу при отправке
        })
    }
    close() {
        super.close();
        this.popupForm.reset();
    }
}
export default PopupWithForm



