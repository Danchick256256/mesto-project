import {openPopup} from "./utils";


class Card {
    constructor(imageLink, name, templateClass) {
        this.image = imageLink;
        this.name = name;
        this.template = templateClass;
    }

    createCard() {
        const imagePopup = document.querySelector('#imagePopup');
        const popupImage = document.querySelector('.popup__image');
        const popupCaption = document.querySelector('.popup__image-caption');

        const cardElement = document
            .querySelector(this.template)
            .content.querySelector('.card')
            .cloneNode(true);

        this.cardImage = cardElement.querySelector(".card__image");
        this.cardImage.src = this.image;
        this.cardImage.alt = this.name;

        this.cardTitle = cardElement.querySelector(".card__title");
        this.cardTitle.textContent = this.name;

        this.likeButton = cardElement.querySelector('.card__button-like');


        this.likeButton.addEventListener('click', () => {
            console.log(`{handled.like.click}`);
            this.likeButton.classList.toggle('card__button-like_active_true')
        });

        this.deleteButton = cardElement.querySelector('.card__button-delete');
        this.deleteButton.addEventListener('click', () => {
            console.log(`{handled.delete.click}`);
            this.deleteButton.parentNode.classList.add("card__remove");
            setTimeout(() => cardElement.remove(), 350);
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

const getMeta = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}

export default Card;