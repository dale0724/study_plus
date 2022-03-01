export default class newsDTO {
    constructor(id=0, user_email, latitude, longitude, votes=0, title, content) {
        this.id = id;
        this.user_email = user_email;
        this.latitude = latitude;
        this.longitude = longitude;
        this.votes = votes;
        this.title = title;
        this.content = content;
    }
}
export function ObjectToInstance(obj){
    return new newsDTO(obj.id, obj.user_email, obj.latitude, obj.longitude, obj.votes, obj.title, obj.content)
}
export function JSONToInstance(json){
    const obj = JSON.parse(json)
    return new newsDTO(obj.id, obj.user_email, obj.latitude, obj.longitude, obj.votes, obj.title, obj.content)
}