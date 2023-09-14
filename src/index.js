import './pages/index.css';

import Card from './scripts/Card.js';
import ValidationForm from './scripts/ValidationForm.js';

import {openPopup, closePopup} from "./scripts/utils.js";
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

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

const newPlaceFormElement = document.querySelector("#newPlaceForm");
const newPlaceNameInput = newPlaceFormElement.querySelector('input[name="name"]');
const newPlaceLinkInput = newPlaceFormElement.querySelector('input[name="link"]');

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


const createCard = (link, title, template) => {
    const card = new Card(link, title, template);
    return card.createCard();
}


const addInitialCard = () => {
    for (const cardData of initialCards) {
        const card = createCard(cardData.link, cardData.title, '.card__template');
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

    const card = createCard(newPlaceLinkInput.value, newPlaceNameInput.value, '.card__template');
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

new ValidationForm({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__item_error',
    errorClass: 'popup__input-error_active'
});
