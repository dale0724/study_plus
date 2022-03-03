export default class discussionDTO {
    constructor(id, user_email, create_time, title, content) {
        this.id = id;
        this.user_email = user_email;
        this.create_time = create_time;
        this.title = title;
        this.content = content;
    }
}
export function ObjectToInstance(obj){
    return new discussionDTO(obj.id, obj.user_email, obj.create_time, obj.title, obj.content)
}
export function JSONToInstance(json){
    const obj = JSON.parse(json)
    return new discussionDTO(obj.id, obj.user_email, obj.create_time, obj.title, obj.content)
}