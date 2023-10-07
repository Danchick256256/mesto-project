import Popup from "./Popup";

class PopupWithImage extends Popup{
    constructor(popupElement){
        this._imagePopup = this.popupElement.querySelector('.popup__image');
        this._imageCaption = this.popupElement.querySelector('.popup__image-caption');
    }
    open(data){
        super.open();
        this._imagePopup.style.backgroundImage = url(data.link) // вытащить из созданных карточек назватие
        this._imageCaption.TextContnt =  data.name;// вытащить из созданных карточек назватие 
    }
}