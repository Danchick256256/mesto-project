import './pages/index.css';

import Card from './scripts/Card.js';
import Api from './scripts/API';
import UserInfo from "./scripts/UserInfo.js"
import Section from "./scripts/Section.js"
import FormValidator from './scripts/FormValidator.js';
import { getMeta } from "./scripts/utils.js";
import {
    buttonOpenPopupAddCard, avatarInput, cardsSection,
    avatarEditPopup,
    buttonOpenPopupEditUserData, formElementEdit,
    popupEdit,
    job,
    name,
    jobInput,
    nameInput, newPlaceFormElement, newPlaceLinkInput, newPlaceNameInput,
    newPlacePopup, popups,
    profileAvatar,
    profileSubtitle, profileTitle
} from "./scripts/constants";
import Popup from './scripts/Popup.js';
import PopupWithImage from './scripts/PopupWithImage.js';
const fetchParams = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
    headers: {
        'authorization': '9bae86ff-d65a-4047-b517-3db91df3e9d1',
        'Content-Type': 'application/json'
    }
};

const api = new Api(fetchParams);
const userInfo = new UserInfo({
    userName: profileTitle,
    userAbout: profileSubtitle,
    userAvatar: profileAvatar
}, api);
const section = new Section({renderer: render})

function render(item) {
    cardsSection.prepend(item)
}

let user;

const popupImage = new PopupWithImage('#imagePopup');

const createCard = (link, title, template, createdAt, likes, owner, _id, userData) => {
    const card = new Card(link, title, template, createdAt, likes, owner, _id, userData, (url, text, width, height) => {
        popupImage.open(url, text, width, height);
    });
    return card.createCard(api);
}

const buttonClosePopup = document.querySelectorAll('popup__button-close');


// Открытие редактирование профиля
const popupEditFunc = new Popup('#editPopup');
const popupAddFunc = new Popup('#newPlacePopup');
const popupProfileFunc = new Popup('#avatarPopup');




buttonOpenPopupEditUserData.addEventListener('click', () => {
    popupEditFunc.open();
    nameInput.value = nameInput.value.length === 0 ? name.textContent : nameInput.value;
    jobInput.value = jobInput.value.length === 0 ? job.textContent : jobInput.value;
    popupEditFunc.setEventListeners();
});




buttonOpenPopupAddCard.addEventListener('click', () => {
    console.log(`{click.add.button}`);
    popupAddFunc.open();
});

profileAvatar.addEventListener('click', () => {
    popupProfileFunc.open();
});

function handleEditFormSubmit(evt) {
    console.log(`{submit.edit.form}`);
    evt.preventDefault();
    api.setUserInfoApi(nameInput.value, jobInput.value)
        .then(response => {
            profileTitle.innerText = nameInput.value;
            profileSubtitle.innerText = jobInput.value;
            popupEditFunc.close();
        })
        .catch(err => console.log(err));
}

function handleNewPlaceFormSubmit(evt) {
    console.log(`{submit.newPlace.form}`);
    evt.preventDefault();
    getMeta(newPlaceLinkInput.value, (width, height) => {
        api.saveCard(newPlaceNameInput.value, newPlaceLinkInput.value)
            .then(response => {
                const card = createCard(newPlaceLinkInput.value, newPlaceNameInput.value, '.card__template', response.createdAt, response.likes, response.owner, response._id, user);
                newPlaceLinkInput.value = "";
                newPlaceNameInput.value = "";
                section.addItem(card);
                closePopup(newPlacePopup);
            })
            .catch(err => {
                console.log(err)
            });
    });
}

function handleAvatarUpdateSubmit(evt) {
    console.log(`{submit.updateAvatar.form}`);
    evt.preventDefault();
    api.setAvatar(avatarInput.value)
        .then(r => {
            userInfo.setUserInfo({
                name: r.name,
                about: r.about,
                avatar: r.avatar
            })
            closePopup(avatarEditPopup);
        })
        .catch(err => console.log(err));
}


formElementEdit.addEventListener('submit', handleEditFormSubmit);
newPlaceFormElement.addEventListener('submit', handleNewPlaceFormSubmit);
avatarEditPopup.addEventListener('submit', handleAvatarUpdateSubmit);

Promise.all([userInfo.getUserInfo(), api.getCards()])
    .then((result) => {
        const [userData, cards] = result;
        user = userData;
        userInfo.setUserInfo({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar
        })
        section.renderAll(cards.reverse().map(cardData => createCard(cardData.link, cardData.name, '.card__template', cardData.createdAt, cardData.likes, cardData.owner, cardData._id, userData)));
    })
    .catch((err) => {
        console.log(err);
    });

const validData = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__item_error',
    errorClass: 'popup__input-error_active',
    popupOpenedClass: 'popup_opened'
};

const popupEditFormValidate = new FormValidator(validData, popupEdit.querySelector(validData.formSelector))
const popupAvatarFormValidate = new FormValidator(validData, avatarEditPopup.querySelector(validData.formSelector))
const popupPostFormValidate = new FormValidator(validData, newPlacePopup.querySelector(validData.formSelector))

popupEditFormValidate.enableValidation();
popupAvatarFormValidate.enableValidation();
popupPostFormValidate.enableValidation();
