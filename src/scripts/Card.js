import {openPopup} from "./utils";
import {
    cardsSection,
    imagePopup,
    popupCaption,
    popupImage,
    profileAvatar,
    profileSubtitle,
    profileTitle
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

        setInterval(() => {
            this.updateLikes(api);
        }, 15000);

        this.likeButton.addEventListener('click', () => {
            console.log(`{handled.like.click}`);
            this.likeButton.classList.toggle('card__button-like_active_true')
            if (!this.likeButton.classList.contains('card__button-like_active_true')) {
                //this.likeCounter.textContent = this.likeCounter.textContent === "1" ? "" : (parseInt(this.likeCounter.textContent) - 1).toString();
                api.dislikeCard(this._id)
                    .catch(err => console.log(err));
                this.updateLikes(api); // c эти подходом лайки прогружается дольше
            } else {
                //this.likeCounter.textContent = this.likeCounter.textContent === "" ? 1 : (parseInt(this.likeCounter.textContent) + 1).toString();
                api.likeCard(this._id)
                    .catch(err => console.log(err));
                this.updateLikes(api);
            }
        });

        this.deleteButton = cardElement.querySelector('.card__button-delete');
        this.deleteButton.addEventListener('click', () => {
            console.log(`{handled.delete.click}`);
            api.deleteCard(this._id)
                .then(evt => {
                    this.deleteButton.parentNode.classList.add("card__remove");
                    setTimeout(() => cardElement.remove(), 350); // карточка удаляется из дом дерева
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

    updateLikes = (api) => {
        api.getCards()
            .then((result) => {
                for (const card of result) {
                    for (const like of card.likes) {
                        if (card._id === this._id) {
                            if (card.likes.length === 1) this.likeCounter.textContent = '1';
                            else this.likeCounter.textContent = card.likes.length;
                        }
                    }
                }
            })
            .catch((err) => {
                console.log("err");
            })
    }
}

const getMeta = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}

export default Card;