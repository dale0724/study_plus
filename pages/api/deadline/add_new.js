import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
export default async function handler(req, res) {
    //console.log(req.body)
    await fetchWrapper.post(API_url.add_new_deadline_post, req.body).then(resPayload =>{
        //console.log(resPayload)
        res.status(200).json({ message:resPayload.message, data: resPayload.message });
        res.end();
    }).catch(error => {
        console.error(error)
        res.status(405).json(error);
        res.end();
    })
}