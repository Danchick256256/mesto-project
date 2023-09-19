import './pages/index.css';

import Card from './scripts/Card.js';
import Api from './scripts/API';
import ValidationForm from './scripts/ValidationForm.js';

import {openPopup, closePopup, getMeta} from "./scripts/utils.js";
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
    profileSubtitle, profileTitle, popupImage
} from "./scripts/constants";


const fetchParams = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
    headers: {
        'authorization': '9bae86ff-d65a-4047-b517-3db91df3e9d1',
        'Content-Type': 'application/json'
    }
};

const api = new Api(fetchParams);

let user;

const createCard = (link, title, template, createdAt, likes, owner, _id, userData) => {
    const card = new Card(link, title, template, createdAt, likes, owner, _id, userData,);
    return card.createCard(api);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button-close')) {
            closePopup(popup)
        }
    })
})

buttonOpenPopupEditUserData.addEventListener('click', () => {
    console.log(`{click.edit.button}`);
    nameInput.value = nameInput.value.length === 0 ? name.textContent : nameInput.value;
    jobInput.value = jobInput.value.length === 0 ? job.textContent : jobInput.value;
    openPopup(popupEdit);
});

buttonOpenPopupAddCard.addEventListener('click', () => {
    console.log(`{click.add.button}`);
    openPopup(newPlacePopup);
});

profileAvatar.addEventListener('click', () => {
    openPopup(avatarEditPopup);
});

function handleEditFormSubmit(evt) {
    console.log(`{submit.edit.form}`);
    evt.preventDefault();
    api.setUserInfo(nameInput.value, jobInput.value)
        .then(response => {
            profileTitle.innerText = nameInput.value;
            profileSubtitle.innerText = jobInput.value;
            closePopup(popupEdit);
        })
        .catch(err => console.log(err));
}

function handleNewPlaceFormSubmit(evt) {
    console.log(`{submit.newPlace.form}`);
    evt.preventDefault();
    getMeta(newPlaceLinkInput.value, (width, height) => {
        api.saveCard(newPlaceNameInput.value, newPlaceLinkInput.value)
            .then(response => {
                const card = new Card(newPlaceLinkInput.value, newPlaceNameInput.value, '.card__template', response.createdAt, response.likes, response.owner, response._id, user).createCard(api);
                newPlaceLinkInput.value = "";
                newPlaceNameInput.value = "";
                cardsSection.prepend(card);
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
            profileAvatar.style.backgroundImage = `url(${avatarInput.value})`
            closePopup(avatarEditPopup);
        })
        .catch(err => console.log(err));
}


formElementEdit.addEventListener('submit', handleEditFormSubmit);
newPlaceFormElement.addEventListener('submit', handleNewPlaceFormSubmit);
avatarEditPopup.addEventListener('submit', handleAvatarUpdateSubmit);

Promise.all([api.getUserInfo(), api.getCards()])
    .then((result) => {
        const [userData, cards] = result;
        user = userData;
        console.log("TEST")
        profileTitle.textContent = userData.name;
        profileSubtitle.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`

        for (const cardData of cards.reverse()) {
            const card = createCard(cardData.link, cardData.name, '.card__template', cardData.createdAt, cardData.likes, cardData.owner, cardData._id, userData);
            console.log(`{adding.initial.cards{${cardData.link}, ${cardData.name}}`);
            cardsSection.prepend(card);
        }
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

const popupEditFormValidate = new ValidationForm(validData, popupEdit.querySelector(validData.formSelector))
const popupAvatarFormValidate = new ValidationForm(validData, avatarEditPopup.querySelector(validData.formSelector))
const popupPostFormValidate = new ValidationForm(validData, newPlacePopup.querySelector(validData.formSelector))

popupEditFormValidate.enableValidation();
popupAvatarFormValidate.enableValidation();
popupPostFormValidate.enableValidation();
