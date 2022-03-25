import BaseDTO from "./dto";

export default class AnnouncementDTO extends BaseDTO{
    static ObjectToInstance(obj){
        const dtoInstance = new AnnouncementDTO();
        return super.ObjectToInstance(obj, dtoInstance)
    }

    static JSONToInstance(json){
        const dtoInstance = new AnnouncementDTO();
        return super.JSONToInstance(json, dtoInstance)
    }
}

AnnouncementDTO.prototype.id = undefined
AnnouncementDTO.prototype.user_email = undefined
AnnouncementDTO.prototype.title = undefined
AnnouncementDTO.prototype.content = undefined
AnnouncementDTO.prototype.create_time = undefined