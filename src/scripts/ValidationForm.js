class ValidationForm { // Классы прошли у меня прошлую проверку
    constructor(popup) {
        try {
            this.form = popup.querySelector('.form');
            this.inputList = Array.from(this.form.querySelectorAll('.form__input'));
            this.submitButton = popup.querySelector('.popup__button-submit');
            this.checkValidity() ? this.disableButton() : this.enableButton();
            this.setEventListeners();
        } catch (e) {}
    };

    setEventListeners() {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.checkValidity() ? this.disableButton() : this.enableButton();
                const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
                if (!inputElement.validity.valid) {
                    inputElement.classList.add('popup__item_error');
                    errorElement.classList.add('popup__input-error_active');
                    errorElement.textContent = inputElement.validationMessage;
                } else {
                    inputElement.classList.remove('popup__item_error');
                    errorElement.classList.remove('popup__input-error_active');
                    errorElement.textContent = '';
                }
            });
        });
    };

    disableButton() {
        this.submitButton.disabled = true;
        this.submitButton.classList.add('popup__button-submit_disabled');
    };

    enableButton() {
        this.submitButton.disabled = false;
        this.submitButton.classList.remove('popup__button-submit_disabled');
    };

    checkValidity() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
}

export default ValidationForm;
