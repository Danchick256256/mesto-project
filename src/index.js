import './pages/index.css';

import Card from './scripts/Card.js';
import Api from './scripts/API';
import ValidationForm from './scripts/ValidationForm.js';

import {openPopup, closePopup} from "./scripts/utils.js";

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const cardsSection = document.querySelector('.elements');

const popups = document.querySelectorAll('.popup');

const editPopup = document.querySelector('#editPopup');
const editAvatarPopup = document.querySelector('#avatarPopup');
const newPlacePopup = document.querySelector('#newPlacePopup');

const profileTitle = document.querySelector('.profile__title');
const profileAvatar = document.querySelector('.profile__avatar');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editAvatarElement = document.querySelector("#editAvatarForm");
const avatarInput = editAvatarElement.querySelector('input[name="avatar"]');

const editFormElement = document.querySelector("#editForm");
const nameInput = editFormElement.querySelector('input[name="username"]');
const jobInput = editFormElement.querySelector('input[name="job"]');

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

const newPlaceFormElement = document.querySelector("#newPlaceForm");
const newPlaceNameInput = newPlaceFormElement.querySelector('input[name="name"]');
const newPlaceLinkInput = newPlaceFormElement.querySelector('input[name="link"]');

const fetchParams = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
    headers: {
        'authorization': '9bae86ff-d65a-4047-b517-3db91df3e9d1',
        'Content-Type': 'application/json'
    }
};

const api = new Api(fetchParams);

let userData;

async function setUserData() {
    await api.getUserInfo()
        .then(async response => {
            userData = await response;
        });
}

await setUserData();

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

editButton.addEventListener('click', () => {
    console.log(`{click.edit.button}`);
    nameInput.value = nameInput.value.length === 0 ? name.textContent : nameInput.value;
    jobInput.value = jobInput.value.length === 0 ? job.textContent : jobInput.value;
    openPopup(editPopup);
});

addButton.addEventListener('click', () => {
    console.log(`{click.add.button}`);
    openPopup(newPlacePopup);
});

profileAvatar.addEventListener('click', () => {
    openPopup(editAvatarPopup);
});


const createCard = (link, title, template, createdAt, likes, owner, _id, userData) => {
    const card = new Card(link, title, template, createdAt, likes, owner, _id, userData);
    return card.createCard(api);
}

const addInitialCard = () => {
    api.resolve().then(data => {
        profileTitle.textContent = data[0].name;
        profileSubtitle.textContent = data[0].about;
        profileAvatar.style.backgroundImage = `url(${data[0].avatar})`

        for (const cardData of data[1].reverse()) {
            const card = createCard(cardData.link, cardData.name, '.card__template', cardData.createdAt, cardData.likes, cardData.owner, cardData._id, userData);
            console.log(`{adding.initial.cards{${cardData.link}, ${cardData.name}}`);
            cardsSection.prepend(card);
        }
    });
};

addInitialCard();

function handleEditFormSubmit(evt) {
    console.log(`{submit.edit.form}`);
    evt.preventDefault();
    nameInput.textContent = nameInput.value;
    jobInput.textContent = jobInput.value;
    profileTitle.innerText = nameInput.value;
    profileSubtitle.innerText = jobInput.value;
    api.setUserInfo(nameInput.value, jobInput.value);
    closePopup(editPopup);
}

function handleNewPlaceFormSubmit(evt) {
    console.log(`{submit.newPlace.form}`);
    evt.preventDefault();

    api.saveCard(newPlaceNameInput.value, newPlaceLinkInput.value)
        .then(response => {
            const card = new Card(newPlaceLinkInput.value, newPlaceNameInput.value, '.card__template', response.createdAt, response.likes, response.owner, response._id, userData).createCard(api);
            newPlaceLinkInput.value = "";
            newPlaceNameInput.value = "";
            cardsSection.prepend(card);
        });
    closePopup(newPlacePopup);
}

function handleAvatarUpdateSubmit(evt) {
    console.log(`{submit.updateAvatar.form}`);
    evt.preventDefault();
    profileAvatar.style.backgroundImage = `url(${avatarInput.value})`
    api.setAvatar(avatarInput.value).then(r => console.log(r));
    closePopup(editAvatarPopup);
}


editFormElement.addEventListener('submit', handleEditFormSubmit);
newPlaceFormElement.addEventListener('submit', handleNewPlaceFormSubmit);
editAvatarPopup.addEventListener('submit', handleAvatarUpdateSubmit);

new ValidationForm({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__item_error',
    errorClass: 'popup__input-error_active',
    popupOpenedClass: 'popup_opened'
});
