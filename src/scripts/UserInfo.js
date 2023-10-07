export default class UserInfo {
    constructor({userName, userAbout, userAvatar}, api) {
        this.userName = userName
        this.userAvatar = userAvatar;
        this.userAbout = userAbout
        this.api = api
    }

    getUserInfo = () => {
        return this.api.getUserInfoApi()
            .then(data => {
                this.name = data.name
                this.about = data.about
                this.avatar = data.avatar
                return {...data}
            })
    }

    setUserInfo = ({name, about, avatar}) => {
        this.api.setAvatar(avatar)
            .then(data =>{
                this.userAvatar.style.backgroundImage = `url(${data.avatar})`
            })
        return this.api.setUserInfoApi(name, about)
            .then(data => {
                this.userName.textContent = data.name
                this.userAbout.textContent = data.about
                return {...data}
            })
    }
}