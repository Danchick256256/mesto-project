export const closePopup = (popup) => {
    console.log(`{close.popup{${popup}}`);
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape, false);
};

function closeByEscape(evt) {
    if (evt.code === "Escape") {
        document.removeEventListener('keydown', closeByEscape, false);
        console.log(`{escape.pressed}`);
        closePopup(document.querySelector('.popup_opened'));
    }
}

export function openPopup(popup) {
    document.addEventListener('keydown', closeByEscape, false);
    console.log(`{open.popup{${popup}}`);
    popup.classList.add('popup_opened');
}