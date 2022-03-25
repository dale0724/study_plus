export default class BaseDTO {
    static ObjectToInstance(obj, emptyInstance){
        const dtoInstance = emptyInstance;
        for(const k in dtoInstance){
            if (obj.hasOwnProperty(k)){
                dtoInstance[k] = obj[k]
            }
        }
        return dtoInstance
    }

    static JSONToInstance(json, emptyInstance){
       const obj = JSON.parse(json)
       return this.ObjectToInstance(obj, emptyInstance)
    }
}