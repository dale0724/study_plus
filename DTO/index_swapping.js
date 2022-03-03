export default class indexSwappingDTO {
    constructor(id, user_email, create_time, course_title, current_index, content) {
        this.id = id;
        this.user_email = user_email;
        this.create_time = create_time;
        this.course_title = course_title;
        this.current_index = current_index;
        this.content = content;
    }
}
export function ObjectToInstance(obj){
    return new indexSwappingDTO(obj.id, obj.user_email, obj.create_time, obj.course_title, obj.current_index, obj.content)
}
export function JSONToInstance(json){
    const obj = JSON.parse(json)
    return new indexSwappingDTO(obj.id, obj.user_email, obj.create_time, obj.course_title, obj.current_index, obj.content)
}