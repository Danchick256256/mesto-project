import './pages/index.css';

import Card from './scripts/Card.js';
import Api from './scripts/API';
import UserInfo from "./scripts/UserInfo.js"
import Section from "./scripts/Section.js"
import FormValidator from './scripts/FormValidator.js';

import {getMeta} from "./scripts/utils.js";
import {
    buttonOpenPopupAddCard, avatarInput, cardsSection,
    avatarEditPopup,
    buttonOpenPopupEditUserData, popupEdit,
    job,
    name,
    jobInput,
    nameInput, newPlacePopup, profileAvatar,
    profileSubtitle, profileTitle
} from "./scripts/constants";

import Popup from './scripts/Popup.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';


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

const section = new Section({
    renderer: (item) => {
        cardsSection.prepend(item)
    }
})

let user;

const popupImage = new PopupWithImage('#imagePopup');
const popupAvatarEdit = new PopupWithForm('#avatarPopup', (inputs) => {
    console.log(inputs)
    console.log(`{submit.updateAvatar.form}`);
    api.setAvatar(avatarInput.value)
        .then(r => {
            userInfo.setUserInfo({
                name: r.name,
                about: r.about,
                avatar: r.avatar
            })
        })
        .catch(err => console.log(err));
});
const popupNewPlace = new PopupWithForm('#newPlacePopup', (inputs) => {
    console.log(inputs)
    console.log(`{submit.newPlace.form}`);
    getMeta(inputs.link, (width, height) => {
        api.saveCard(inputs.name, inputs.link)
            .then(response => {
                const card = createCard(inputs.link, inputs.name, '.card__template', response.createdAt, response.likes, response.owner, response._id, user);
                section.addItem(card);
            })
            .catch(err => {
                console.log(err)
            });
    });
});
const popupEditForm = new PopupWithForm('#editPopup', (inputs) => {
    console.log(`{submit.edit.form}`);
    api.setUserInfoApi(inputs.username, inputs.job)
        .then(response => {
            profileTitle.innerText = inputs.username;
            profileSubtitle.innerText = inputs.job;
        })
        .catch(err => console.log(err));
});

buttonOpenPopupEditUserData.addEventListener('click', () => {
    popupEditForm.open();
    nameInput.value = nameInput.value.length === 0 ? name.textContent : nameInput.value;
    jobInput.value = jobInput.value.length === 0 ? job.textContent : jobInput.value;
    popupEditForm.setEventListeners();
});

buttonOpenPopupAddCard.addEventListener('click', () => {
    console.log(`{click.add.button}`);
    popupNewPlace.open();
    popupNewPlace.setEventListeners();
});

profileAvatar.addEventListener('click', () => {
    popupAvatarEdit.open();
    popupAvatarEdit.setEventListeners();
});


const createCard = (link, title, template, createdAt, likes, owner, _id, userData) => {
    const card = new Card(link, title, template, createdAt, likes, owner, _id, userData, (url, text, width, height) => {
        popupImage.open(url, text, width, height);
        popupImage.setEventListeners();
    });
    return card.createCard(api);
}

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
