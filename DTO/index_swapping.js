export default class IndexSwappingDTO {

    static objectToInstance(obj) {
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
        return this.objectToInstance(obj)
    }
}

IndexSwappingDTO.prototype.id = undefined
IndexSwappingDTO.prototype.content = undefined
IndexSwappingDTO.prototype.course_title = undefined
IndexSwappingDTO.prototype.current_index = undefined
IndexSwappingDTO.prototype.wanted_indexes = undefined
IndexSwappingDTO.prototype.user_email = undefined
IndexSwappingDTO.prototype.create_time = undefined