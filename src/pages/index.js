import './index.css';

import Card from '../scripts/Card.js';
import Api from '../scripts/API';
import UserInfo from "../scripts/UserInfo.js"
import Section from "../scripts/Section.js"
import FormValidator from '../scripts/FormValidator.js';

import {getMeta} from "../scripts/utils/utils.js";
import {
    buttonOpenPopupAddCard,
    avatarEditPopup,
    buttonOpenPopupEditUserData, popupEdit,
    jobInput,
    nameInput, newPlacePopup, profileAvatar,
    profileSubtitle, profileTitle, validData
} from "../scripts/utils/constants";

import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';


const fetchParams = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
    headers: {
        'authorization': '9bae86ff-d65a-4047-b517-3db91df3e9d1',
        'Content-Type': 'application/json'
    }
};

const api = new Api(fetchParams);
const userInfo = new UserInfo({
    nameSelector: profileTitle,
    jobSelector: profileSubtitle,
    avatarSelector: profileAvatar
});

const section = new Section('.elements', {
    renderer: (section, item) => {
        section.prepend(item)
    }
})

let user;

const popupImage = new PopupWithImage('#imagePopup');
popupImage.setEventListeners();
const popupAvatarEdit = new PopupWithForm('#avatarPopup', (inputs) => {
    console.log(`{submit.updateAvatar.form}`);
    popupAvatarEdit.renderLoading(true)
    api.setAvatar(inputs.avatar)
        .then(r => {
            userInfo.setUserInfo({
                name: r.name,
                about: r.about,
                avatar: r.avatar,
                _id: r._id
            })
            popupAvatarEdit.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupAvatarEdit.renderLoading(false));
});
popupAvatarEdit.setEventListeners();
const popupNewPlace = new PopupWithForm('#newPlacePopup', (inputs) => {
    console.log(`{submit.newPlace.form}`);
    popupNewPlace.renderLoading(true);
    getMeta(inputs.link, (width, height) => {
        api.saveCard(inputs.name, inputs.link)
            .then(response => {
                const card = createCard(inputs.link, inputs.name, '.card__template', response.createdAt, response.likes, response.owner, response._id, user);
                section.addItem(card);
                popupNewPlace.close();
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => popupNewPlace.renderLoading(false));
    });
});
popupNewPlace.setEventListeners();
const popupEditForm = new PopupWithForm('#editPopup', (inputs) => {
    console.log(`{submit.edit.form}`);
    popupEditForm.renderLoading(true);
    api.setUserInfoApi(inputs.username, inputs.job)
        .then(response => {
            userInfo.setUserInfo({
                name: response.name,
                about: response.about,
                avatar: response.avatar,
                _id: response._id
            })
            popupEditForm.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupEditForm.renderLoading(false));
});
popupEditForm.setEventListeners();

buttonOpenPopupEditUserData.addEventListener('click', () => {
    popupEditForm.open();
    const data = userInfo.getUserInfo()
    nameInput.value = nameInput.value.length === 0 ? data.name : nameInput.value;
    jobInput.value = jobInput.value.length === 0 ? data.about : jobInput.value;
});

buttonOpenPopupAddCard.addEventListener('click', () => {
    popupNewPlace.open();
});

profileAvatar.addEventListener('click', () => {
    popupAvatarEdit.open();
});


const createCard = (link, title, template, createdAt, likes, owner, _id, userData) => {
    const card = new Card(link, title, template, createdAt, likes, owner, _id, userData, (url, text, width, height) => {
        popupImage.open(url, text, width, height);
    });
    return card.createCard(api);
}

Promise.all([api.getUserInfoApi(), api.getCards()]) // как получать данные от сервера с помощью .getUserInfo() если api нельзя использовать внутри UserInfo?
    .then((result) => {
        const [userData, cards] = result;
        user = userData;
        userInfo.setUserInfo({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar,
            _id: userData._id
        })
        section.renderAll(cards.reverse().map(cardData => createCard(cardData.link, cardData.name, '.card__template', cardData.createdAt, cardData.likes, cardData.owner, cardData._id, userData)));
    })
    .catch((err) => {
        console.log(err);
    });

const popupEditFormValidate = new FormValidator(validData, popupEdit.querySelector(validData.formSelector))
const popupAvatarFormValidate = new FormValidator(validData, avatarEditPopup.querySelector(validData.formSelector))
const popupPostFormValidate = new FormValidator(validData, newPlacePopup.querySelector(validData.formSelector))

popupEditFormValidate.enableValidation();
popupAvatarFormValidate.enableValidation();
popupPostFormValidate.enableValidation();
