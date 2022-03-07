import BaseDTO from "./dto";

export default class NewsReplyDTO extends BaseDTO{
    static ObjectToInstance(obj){
        var dtoInstance = new NewsReplyDTO()
        return super.ObjectToInstance(obj, dtoInstance)
    }

    static JSONToInstance(json){
       var dtoInstance = new NewsReplyDTO()
       return super.JSONToInstance(json, dtoInstance)
    }
}

NewsReplyDTO.prototype.id = 0
NewsReplyDTO.prototype.campus_news_id = 0
NewsReplyDTO.prototype.user_email = undefined
NewsReplyDTO.prototype.votes = 0
NewsReplyDTO.prototype.content = undefined
NewsReplyDTO.prototype.create_time = undefined