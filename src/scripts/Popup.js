class Popup {
  constructor(popupSelector) {
      this.popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this)
  
      this.setEventListeners();
    }
    open() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
  }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
          this.close();
      }
    }
  
  
    setEventListeners() { 
      this.popupElement.querySelector('.popup__button-close').addEventListener('click', () => {
        this.close();
      });

      this.popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        }
      });
    }
  }

export default Popup



