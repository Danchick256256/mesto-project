class ValidationForm {
    constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, popupOpenedClass}) {
        try {
            this.popupOpenedClass = popupOpenedClass;
            this.inactiveButtonClass = inactiveButtonClass;
            this.inputErrorClass = inputErrorClass;
            this.errorClass = errorClass;
            for (const formElement of Array.from(document.querySelectorAll(formSelector))) {
                const inputList = Array.from(formElement.querySelectorAll(inputSelector));
                if (inputList.length > 0) {
                    const submitButton = formElement.querySelector(submitButtonSelector);
                    this.checkValidity(inputList) ? this.disableButton(submitButton) : this.enableButton(submitButton);
                    this.setEventListeners(formElement, inputList, submitButton);
                }
            }

        } catch (e) {}
    };

    setEventListeners(formElement, inputList, submitButton) {
        const observer = new MutationObserver((mutation) => { //  не знаю как сделать это по другому и чтобы функция была более менее чистой (можно проверять при открытии попапа но это мне кажется будет хуже)
            if (mutation[0].type === 'attributes' && mutation[0].attributeName === 'class') {
                if (mutation[0].target.classList.contains(this.popupOpenedClass)) {
                    this.checkValidity(inputList) ? this.disableButton(submitButton) : this.enableButton(submitButton);
                }
            }
        });
        observer.observe(document, { attributes: true, subtree: true, attributeFilter: ['class'] });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.checkValidity(inputList) ? this.disableButton(submitButton) : this.enableButton(submitButton);
                const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
                if (!inputElement.validity.valid) {
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

    disableButton(submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add(this.inactiveButtonClass);
    };

    enableButton(submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove(this.inactiveButtonClass);
    };

    checkValidity(inputList) {
        return inputList.some((inputElement) => {
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
