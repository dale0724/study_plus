export default class NewsDTO {
    constructor(id, user_email, latitude, longitude, votes, title, content) {
        this.id = id;
        this.user_email = user_email;
        this.latitude = latitude;
        this.longitude = longitude;
        this.votes = votes;
        this.title = title;
        this.content = content;
    }

    static ObjectToInstance(obj){
        return new NewsDTO(obj.id, obj.user_email, obj.latitude, obj.longitude, obj.votes, obj.title, obj.content)
    }

    static JSONToInstance(json){
       const obj = JSON.parse(json)
       return new NewsDTO(obj.id, obj.user_email, obj.latitude, obj.longitude, obj.votes, obj.title, obj.content)
    }
}