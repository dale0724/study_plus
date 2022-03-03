export default class DiscussionDTO {
    constructor(id, user_email, create_time, title, content) {
        this.id = id;
        this.user_email = user_email;
        this.create_time = create_time;
        this.title = title;
        this.content = content;
    }

    static ObjectToInstance(obj){
       return new DiscussionDTO(obj.id, obj.user_email, obj.create_time, obj.title, obj.content)
    }

    static JSONToInstance(json){
      const obj = JSON.parse(json)
      return new DiscussionDTO(obj.id, obj.user_email, obj.create_time, obj.title, obj.content)
    }
}