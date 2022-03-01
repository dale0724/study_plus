import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
export default async function handler(req, res) {
    console.log(req.body)
    await fetchWrapper.post(API_url.add_new_campus_post, req.body).then(resPayload =>{
            console.log(resPayload)
            res.status(200).end();
        }).catch(error => {
              console.error(error)
              res.json(error);
              res.status(405).end();
        })
}