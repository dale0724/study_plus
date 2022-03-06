export default class IndexSwappingDTO {
    constructor(
        id = undefined, user_email = undefined,
        create_time = undefined, course_title = undefined,
        current_index = undefined, wanted_indexes = undefined, content = undefined
    ) {
        this.id = id;
        this.user_email = user_email;
        this.create_time = create_time;
        this.course_title = course_title;
        this.current_index = current_index;
        this.wanted_indexes = wanted_indexes
        this.content = content;
    }

    static ObjectToInstance(obj) {
        var dtoInstance = new IndexSwappingDTO()
        for(var k in dtoInstance){
            if (obj.hasOwnProperty(k)){
                dtoInstance[k] = obj[k]
            }
        }
        return dtoInstance
    }

    static JSONToInstance(json) {
        const obj = JSON.parse(json)
        return this.ObjectToInstance(obj)
    }
}