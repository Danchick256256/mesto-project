import './pages/index.css';

import Card from './scripts/Card.js';
import ValidationForm from './scripts/ValidationForm.js';

import {openPopup} from "./scripts/Card.js";
import {initialCards} from "./scripts/initialCards";

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const cardsSection = document.querySelector('.elements');

const closeButtons = document.querySelectorAll('.popup__button-close');
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

const newPlaceFormElement = document.querySelector("#newPlaceForm");
const newPlaceNameInput = newPlaceFormElement.querySelector('input[name="name"]');
const newPlaceLinkInput = newPlaceFormElement.querySelector('input[name="link"]');

document.addEventListener('keydown', (event) => {
    if (event.code === "Escape") {
        console.log(`{escape.pressed}`);
        for (const popup of popups) {
            closePopup(popup);
        }
    }
}, false);

for (const closeButton of closeButtons) {
    closeButton.addEventListener('click', () => {
        for (const popup of popups) {
            closePopup(popup);
        }
    });
}

editButton.addEventListener('click', () => {
    console.log(`{click.edit.button}`);
    openPopup(editPopup);
});

addButton.addEventListener('click', () => {
    console.log(`{click.add.button}`);
    openPopup(newPlacePopup);
});

const closePopup = (popup) => {
    console.log(`{close.popup{${popup}}`);
    popup.classList.remove('popup_opened');
};

profileAvatar.addEventListener('click', () => {
    openPopup(editAvatarPopup);
});

// Мне нужно полностью переделывать код, то что нужно выполнено же

const addInitialCard = () => {
    for (const cardData of initialCards) {
        const card = new Card(cardData.link, cardData.title, '.card__template').createCard();
        console.log(`{adding.initial.cards{${cardData.link}, ${cardData.name}}`);
        cardsSection.prepend(card);
    }
    profileTitle.textContent = "Жак Ив Кусто";
    profileSubtitle.textContent = "Исследователь океана";
};

addInitialCard();

function handleEditFormSubmit(evt) {
    console.log(`{submit.edit.form}`);
    evt.preventDefault();
    nameInput.textContent = nameInput.value;
    jobInput.textContent = jobInput.value;
    profileTitle.innerText = nameInput.value;
    profileSubtitle.innerText = jobInput.value;
    closePopup(editPopup);
}

function handleNewPlaceFormSubmit(evt) {
    console.log(`{submit.newPlace.form}`);
    evt.preventDefault();

    const card = new Card(newPlaceLinkInput.value, newPlaceNameInput.value, '.card__template').createCard();
    newPlaceLinkInput.value = "";
    newPlaceNameInput.value = "";
    cardsSection.prepend(card);

    closePopup(newPlacePopup);
}

function handleAvatarUpdateSubmit(evt) {
    console.log(`{submit.updateAvatar.form}`);
    evt.preventDefault();
    profileAvatar.style.backgroundImage = `url(${avatarInput.value})`
    closePopup(editAvatarPopup);
}


editFormElement.addEventListener('submit', handleEditFormSubmit);
newPlaceFormElement.addEventListener('submit', handleNewPlaceFormSubmit);
editAvatarPopup.addEventListener('submit', handleAvatarUpdateSubmit);

popups.forEach((popup) => new ValidationForm(popup));
