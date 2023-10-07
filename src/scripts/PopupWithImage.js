import Popup from "./Popup";

class PopupWithImage extends Popup{
    constructor(popupElement){
        this._imagePopup = this.popupElement.querySelector('.popup__image');
        this._imageCaption = this.popupElement.querySelector('.popup__image-caption');
    }
    open(){
        super.open();
        this._imagePopup.style.backgroundImage = url() // вытащить из созданных карточек назватие
        this._imageCaption.TextContnt =  s;// вытащить из созданных карточек назватие 
    }
}