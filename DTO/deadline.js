import BaseDTO from "./dto";

export default class DeadlineDTO extends BaseDTO{
    static ObjectToInstance(obj){
        const dtoInstance = new DeadlineDTO();
        return super.ObjectToInstance(obj, dtoInstance)
    }

    static JSONToInstance(json){
        const dtoInstance = new DeadlineDTO();
        return super.JSONToInstance(json, dtoInstance)
    }
}

DeadlineDTO.prototype.id = undefined
DeadlineDTO.prototype.user_email = undefined
DeadlineDTO.prototype.title = undefined
DeadlineDTO.prototype.detail = undefined
DeadlineDTO.prototype.create_time = undefined
DeadlineDTO.prototype.end_datetime = undefined