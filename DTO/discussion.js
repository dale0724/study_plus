import BaseDTO from "./dto";

export default class DiscussionDTO extends BaseDTO{
    static ObjectToInstance(obj){
        var dtoInstance = new DiscussionDTO()
        return super.ObjectToInstance(obj, dtoInstance)
    }

    static JSONToInstance(json){
       var dtoInstance = new DiscussionDTO()
       return super.JSONToInstance(json, dtoInstance)
    }
}

DiscussionDTO.prototype.id = undefined
DiscussionDTO.prototype.user_email = undefined
DiscussionDTO.prototype.create_time = undefined
DiscussionDTO.prototype.title = undefined
DiscussionDTO.prototype.content = undefined