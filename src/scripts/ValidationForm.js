class ValidationForm {
    constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, popupOpenedClass}, formElement) {
        try {
            this.popupOpenedClass = popupOpenedClass;
            this.inactiveButtonClass = inactiveButtonClass;
            this.inputErrorClass = inputErrorClass;
            this.errorClass = errorClass;
            this.formElement = formElement;
            this.inputList = Array.from(formElement.querySelectorAll(inputSelector));
            this.submitButton = formElement.querySelector(submitButtonSelector);
            this.checkValidity() ? this.disableButton() : this.enableButton();
        } catch (e) {}
    };

    enableValidation() {
        const observer = new MutationObserver((mutation) => {
            if (mutation[0].type === 'attributes' && mutation[0].attributeName === 'class') {
                if (mutation[0].target.classList.contains(this.popupOpenedClass)) {
                    this.checkValidity() ? this.disableButton() : this.enableButton();
                }
            }
        });
        observer.observe(document, { attributes: true, subtree: true, attributeFilter: ['class'] });

        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.checkValidity() ? this.disableButton() : this.enableButton();
                const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
                if (!inputElement.validity.valid || inputElement.validity.isCustom) {
                    inputElement.classList.add(this.inputErrorClass);
                    errorElement.classList.add(this.errorClass);

                    if (inputElement.validity.isCustom) {
                        errorElement.textContent = `Может содержать латинские буквы, кириллические буквы, знаки дефиса и пробелы.`;
                    } else if (inputElement.validity.valueMissing) {
                        errorElement.textContent = `Вы пропустили это поле.`;
                    } else if (inputElement.validity.tooShort) {
                        errorElement.textContent = `Минимальное количество символов: 2. Длина текста сейчас: ${inputElement.value.length} символ`;
                    } else if (inputElement.validity.typeMismatch) {
                        errorElement.textContent = `Введите адрес сайта.`;
                    } else {
                        errorElement.textContent = inputElement.validationMessage;
                    }
                } else {
                    inputElement.classList.remove(this.inputErrorClass);
                    errorElement.classList.remove(this.errorClass);
                    errorElement.textContent = '';
                }
            });
        });
    };

    disableButton() {
        this.submitButton.disabled = true;
        this.submitButton.classList.add(this.inactiveButtonClass);
    };

    enableButton() {
        this.submitButton.disabled = false;
        this.submitButton.classList.remove(this.inactiveButtonClass);
    };

    checkValidity() {
        return this.inputList.some((inputElement) => {
            if (inputElement.type === "text") {
                const pattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
                if (inputElement.value.match(pattern) === null) {
                    inputElement.validity.isCustom = true;
                    return true;
                } else {
                    inputElement.validity.isCustom = false;
                }
            }
            return !inputElement.validity.valid;
        });
    };
}

export default ValidationForm;
