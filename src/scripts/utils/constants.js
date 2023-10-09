export const buttonOpenPopupEditUserData = document.querySelector('.profile__edit-button');
export const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
export const popupEdit = document.querySelector('#editPopup');
export const avatarEditPopup = document.querySelector('#avatarPopup');
export const newPlacePopup = document.querySelector('#newPlacePopup');
export const profileTitle = document.querySelector('.profile__title');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const formElementEdit = document.querySelector("#editForm");
export const nameInput = formElementEdit.querySelector('input[name="username"]');
export const jobInput = formElementEdit.querySelector('input[name="job"]');
export const validData = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__item_error',
    errorClass: 'popup__input-error_active',
    popupOpenedClass: 'popup_opened'
};
