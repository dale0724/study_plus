import BaseDTO from "./dto";

export default class NewsDTO extends BaseDTO{
    static ObjectToInstance(obj){
        var dtoInstance = new NewsDTO()
        return super.ObjectToInstance(obj, dtoInstance)
    }

    static JSONToInstance(json){
       var dtoInstance = new NewsDTO()
       return super.JSONToInstance(json, dtoInstance)
    }
}

NewsDTO.prototype.id = 0
NewsDTO.prototype.user_email = undefined
NewsDTO.prototype.latitude = undefined
NewsDTO.prototype.longitude = undefined
NewsDTO.prototype.votes = 0
NewsDTO.prototype.title = undefined
NewsDTO.prototype.content = undefined