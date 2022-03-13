export default class BaseDTO {
    static ObjectToInstance(obj, emptyInstance){
        var dtoInstance = emptyInstance
        for(var k in dtoInstance){
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