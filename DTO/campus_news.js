export default class newsDTO {
    constructor(id, user_email, latitude, longitude, title, content) {
        this.id = id;
        this.user_email = user_email;
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
        this.content = content;
    }
    ObjectToInstance(obj){
        JSON.parse(obj)

    }
}