export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserInfoApi() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        }).then(this.getData);
    }

    setUserInfoApi(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this.getData);
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        }).then(this.getData);
    }

    saveCard(name, image) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: image
            })
        }).then(this.getData);
    }

    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(this.getData);
    }

    likeCard(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers
        }).then(this.getData);
    }

    dislikeCard(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(this.getData);
    }

    setAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(this.getData);
    }

    getData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error`);
    }
}