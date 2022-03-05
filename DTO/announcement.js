export default class AnnouncementDTO {
    constructor(id, user_email, title, content, create_time) {
        this.id = id;
        this.user_email = user_email;
        this.title = title;
        this.content = content;
        this.create_time = create_time;
    }

    static ObjectToInstance(obj){
        return new AnnouncementDTO(obj.id, obj.user_email, obj.title, obj.content, obj.create_time)
    }

    static JSONToInstance(json){
       const obj = JSON.parse(json)
       return new AnnouncementDTO(obj.id, obj.user_email, obj.title, obj.content, obj.create_time)
    }
}