class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialData(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }

    addCard({ link, name }) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name,
                link
            })
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }
    
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: "DELETE"
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }

    editUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name,
                about,
            })
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }

    changeLikeStatus(cardId, boolean) {
        if (boolean) {
            return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: "PUT"}) 
            .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
        } else {
            return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: "DELETE"})
            .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
        }
        }
    setUserAvatar({ avatar }){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar
            })
        })
        .then((res) => {res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)})
    }
}

export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-4",
    headers: {
        authorization: "072f7e25-49ec-4ac7-aa51-bf0613ff728e",
        "Content-Type": "application/json"
    }
});

