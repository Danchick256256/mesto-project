import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    constructor(popupElement){
        super(popupElement);
        this._imagePopup = this.popupElement.querySelector('.popup__image');
        this._imageCaption = this.popupElement.querySelector('.popup__image-caption');
    }
    open(url, text, width, height){
        super.open();
        this._imagePopup.style.backgroundImage = `url(${url})`;
        this._imagePopup.style.width = width;
        this._imagePopup.style.height = height;
        this._imageCaption.textContent = text;
    }
}