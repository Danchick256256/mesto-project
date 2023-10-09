import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this.popupElement.querySelector(".form");
        this._inputList = this._form.querySelectorAll(".form__input");
        this.submitButton = this.popupElement.querySelector(".popup__button-submit");
        this.submitButtonText = this.submitButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this.submitButton.textContent = loadingText;
        } else {
            this.submitButton.textContent = this.submitButtonText;
        }
    }

    close() {
        this._form.reset();
        super.close();
    }
}