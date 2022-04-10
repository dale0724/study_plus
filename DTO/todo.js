import BaseDTO from "./dto";

export default class TodoDTO extends BaseDTO{
    static ObjectToInstance(obj){
        const dtoInstance = new TodoDTO();
        return super.ObjectToInstance(obj, dtoInstance)
    }

    static JSONToInstance(json){
        const dtoInstance = new TodoDTO();
        return super.JSONToInstance(json, dtoInstance)
    }
}

TodoDTO.prototype.id = undefined
TodoDTO.prototype.user_email = undefined
TodoDTO.prototype.summary = undefined
TodoDTO.prototype.detail = undefined
TodoDTO.prototype.start_datetime = undefined
TodoDTO.prototype.end_datetime = undefined
TodoDTO.prototype.finished = undefined