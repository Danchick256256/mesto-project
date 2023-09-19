import {openPopup, getMeta} from "./utils";
import {
    imagePopup,
    popupCaption,
    popupImage
} from "./constants";


class Card {
    constructor(imageLink, name, templateClass, createdAt, likes, owner, _id, userData) {
        this.userData = userData;
        this.createdAt = createdAt;
        this.likes = likes;
        this.image = imageLink;
        this.name = name;
        this.owner = owner;
        this._id = _id;
        this.template = templateClass;
    }

    createCard(api) {
        const cardElement = document
            .querySelector(this.template)
            .content.querySelector('.card')
            .cloneNode(true);

        this.cardImage = cardElement.querySelector(".card__image");
        this.cardImage.src = this.image;
        this.cardImage.alt = this.name;

        this.cardTitle = cardElement.querySelector(".card__title");
        this.cardTitle.textContent = this.name;

        this.likeCounter = cardElement.querySelector(".cards__like-counter");
        this.likeCounter.textContent = this.likes.length === 0 ? "" : this.likes.length;

        this.likeButton = cardElement.querySelector('.card__button-like');

        for (const like of this.likes) {
            if (like._id === this.userData._id) {
                this.likeButton.classList.add('card__button-like_active_true')
            }
        }

        this.likeButton.addEventListener('click', () => {
            console.log(`{handled.like.click}`);
            if (!this.likeButton.classList.contains('card__button-like_active_true')) {
                api.dislikeCard(this._id)
                    .then(response => {
                        this.likeButton.classList.toggle('card__button-like_active_true')
                        this.likeCounter.textContent = response.likes.length;
                    })
                    .catch(err => console.log(err));
            } else {
                api.likeCard(this._id)
                    .then(response => {
                        this.likeButton.classList.toggle('card__button-like_active_true')
                        this.likeCounter.textContent = response.likes.length;
                    })
                    .catch(err => console.log(err));
            }
        });

        this.deleteButton = cardElement.querySelector('.card__button-delete');
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
            console.log(`{click.on.image{caption: ${this.cardTitle.textContent}}`);
            popupImage.style.backgroundImage = `url(${this.cardImage.src})`;

            getMeta(
                this.cardImage.src,
                (width, height) => {
                    popupImage.style.width = width + "px";
                    popupImage.style.height = height + "px";
                }
            )

            popupCaption.textContent = this.cardTitle.textContent;
            openPopup(imagePopup);
        });

        return cardElement;
    }
}

export default Card;