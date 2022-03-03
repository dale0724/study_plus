export default class IndexSwappingDTO {
    constructor(id, user_email, create_time, course_title, current_index, content) {
        this.id = id;
        this.user_email = user_email;
        this.create_time = create_time;
        this.course_title = course_title;
        this.current_index = current_index;
        this.content = content;
    }

    static function ObjectToInstance(obj){
       return new IndexSwappingDTO(obj.id, obj.user_email, obj.create_time, obj.course_title, obj.current_index, obj.content)
    }

    static function JSONToInstance(json){
       const obj = JSON.parse(json)
       return new IndexSwappingDTO(obj.id, obj.user_email, obj.create_time, obj.course_title, obj.current_index, obj.content)
    }
}