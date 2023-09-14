export const closePopup = (popup) => {
    console.log(`{close.popup{${popup}}`);
    popup.classList.remove('popup_opened');
};

export function openPopup(popup) {
    document.addEventListener('keydown', function closeByEscape(evt) {
        if (evt.code === "Escape") {
            document.removeEventListener('keydown', closeByEscape, false);
            console.log(`{escape.pressed}`);
            closePopup(popup);
        }
    }, false);
    console.log(`{open.popup{${popup}}`);
    const inputElements = Array.from(popup.querySelectorAll('.form__input'));
    const buttonSubmit = popup.querySelector(`.popup__button-submit`);

    const valid = inputElements.reduce((isValid, inputElement) => inputElement.validity.valid ? isValid : false, true);

    if (inputElements.length > 0) {
        if (!valid) {
            buttonSubmit.disabled = true;
            buttonSubmit.classList.add('popup__button-submit_disabled')
        } else {
            buttonSubmit.disabled = false;
            buttonSubmit.classList.remove('popup__button-submit_disabled')
        }
    }
    popup.classList.add('popup_opened');
}