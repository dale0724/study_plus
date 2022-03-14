import BaseDTO from "./dto";

export default class DiscussionReplyDTO extends BaseDTO{
    static ObjectToInstance(obj){
        var dtoInstance = new DiscussionReplyDTO()
        return super.ObjectToInstance(obj, dtoInstance)
    }

    static JSONToInstance(json){
       var dtoInstance = new DiscussionReplyDTO()
       return super.JSONToInstance(json, dtoInstance)
    }
}

DiscussionReplyDTO.prototype.id = 0
DiscussionReplyDTO.prototype.discussion_post_id = 0
DiscussionReplyDTO.prototype.user_email = undefined
DiscussionReplyDTO.prototype.votes = 0
DiscussionReplyDTO.prototype.content = undefined
DiscussionReplyDTO.prototype.create_time = undefined