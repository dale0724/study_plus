export default class DiscussionPostDTO {
    static objectToInstance(obj) {
        const dtoInstance = new DiscussionPostDTO();
        for(const k in dtoInstance){
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

DiscussionPostDTO.prototype.id = undefined
DiscussionPostDTO.prototype.user_email = undefined
DiscussionPostDTO.prototype.create_time = undefined
DiscussionPostDTO.prototype.title = undefined
DiscussionPostDTO.prototype.content = undefined