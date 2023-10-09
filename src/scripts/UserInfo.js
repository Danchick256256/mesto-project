export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = nameSelector;
        this.jobElement = jobSelector;
        this._avatarElement = avatarSelector;
    }

    getUserInfo = () => {
        return {
            name: this._nameElement.textContent,
            about: this.jobElement.textContent,
            userId: this._userId,
        };
    };
    setUserInfo({ name, about, avatar, _id }) {
        this._nameElement.textContent = name;
        this.jobElement.textContent = about;
        this._avatarElement.style.backgroundImage = `url(${avatar})`
        this._userId = _id;
    }
}
