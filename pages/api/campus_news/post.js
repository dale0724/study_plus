import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
export default async function handler(req, res) {
    if(req.method === "DELETE"){
        await fetchWrapper.delete(API_url.add_new_campus_post, req.body).then(resPayload =>{
            res.status(200).json({ message:resPayload.message, data: resPayload.data });
            res.end();
        }).catch(error => {
            console.error(error)
            res.status(error.status).json(error);
            res.end();
        })
    }
}