import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
export default async function handler(req, res) {
    if(req.method === "DELETE"){
        await fetchWrapper.delete(API_url.discussion_post, req.body).then(resPayload =>{
            res.status(200).json({ message:resPayload.message, data: resPayload.data });
            res.end();
        }).catch(error => {
            console.error(error)
            res.status(error.status).json(error);
            res.end();
        })
    }
    if(req.method === "GET"){
        const query_params = req.query
        if(query_params.hasOwnProperty("offset") && query_params.hasOwnProperty("quantity_limit")){
            await fetchWrapper.get(API_url.discussion_post+"/offset/"+query_params.offset+"/quantity_limit/"+query_params.quantity_limit).
            then(resPayload => {
                res.status(200).json({message: resPayload.message, data: resPayload.data})
            }).
            catch(
                error => {
                console.error(error)
                res.status(error.status).json(error);
                res.end();
                })
        }
    }
}