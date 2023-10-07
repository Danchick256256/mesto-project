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

export const getMeta = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}