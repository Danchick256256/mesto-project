import {getMeta} from "./utils/utils";

class Card {
    constructor(imageLink, name, templateClass, createdAt, likes, owner, _id, userData, openImagePopup) {
        this.userData = userData;
        this.createdAt = createdAt;
        this.likes = likes;
        this.image = imageLink;
        this.name = name;
        this.owner = owner;
        this._id = _id;
        this.template = templateClass;
        this.openImagePopup = openImagePopup;
    }

    createCard(api) {
        const cardElement = document
            .querySelector(this.template)
            .content.querySelector('.card')
            .cloneNode(true);

        this.#setElements(cardElement);

        if (this.userData._id !== this.owner._id) {
            this.deleteButton.style.display = 'none';
        }

        for (const like of this.likes) {
            if (like._id === this.userData._id) {
                this.likeButton.classList.add('card__button-like_active_true');
            }
        }

        this.cardImage.src = this.image;
        this.cardImage.alt = this.name;

        this.cardTitle.textContent = this.name;

        this.likeCounter.textContent = this.likes.length === 0 ? "" : this.likes.length;

        this.#setEventListeners(api, cardElement);
        return cardElement;
    }

    #setElements(cardElement) {
        this.cardImage = cardElement.querySelector(".card__image");

        this.cardTitle = cardElement.querySelector(".card__title");

        this.likeCounter = cardElement.querySelector(".cards__like-counter");

        this.likeButton = cardElement.querySelector('.card__button-like');

        this.deleteButton = cardElement.querySelector('.card__button-delete');
    }

    #setEventListeners(api, cardElement) {
        this.deleteButton.addEventListener('click', () => {
            console.log(`{handled.delete.click}`);
            api.deleteCard(this._id)
                .then(() => {
                    this.deleteButton.parentNode.classList.add("card__remove");
                    setTimeout(() => cardElement.remove(), 350);
                })
                .catch(exception => console.log(exception))
        });

        this.cardImage.addEventListener('click', () => {
            getMeta(
                this.cardImage.src,
                (width, height) => {
                    this.openImagePopup(this.cardImage.src, this.cardTitle.textContent, `${width}px`, `${height}px`)
                }
            )
        });

        this.likeButton.addEventListener('click', () => {
            console.log(`{handled.like.click}`);
            if (this.likeButton.classList.contains('card__button-like_active_true')) {
                api.dislikeCard(this._id)
                    .then(response => {
                        this.likeButton.classList.toggle('card__button-like_active_true')
                        if (response.likes.length === 0) this.likeCounter.textContent = "";
                        else this.likeCounter.textContent = response.likes.length;
                    })
                    .catch(err => console.log(err));
            } else {
                api.likeCard(this._id)
                    .then(response => {
                        this.likeButton.classList.toggle('card__button-like_active_true')
                        if (response.likes.length === 0) this.likeCounter.textContent = "";
                        else this.likeCounter.textContent = response.likes.length;
                    })
                    .catch(err => console.log(err));
            }
        });
    }
}

export default Card;