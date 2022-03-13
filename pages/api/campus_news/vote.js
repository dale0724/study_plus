import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
export default async function handler(req, res) {
    var apiUrl
    if (req.body.type=="post"){
        apiUrl = API_url.campus_news_add_vote_number
    }else{
        apiUrl = API_url.campus_news_reply_add_vote_number
    }
    await fetchWrapper.put(apiUrl, req.body).then(resPayload =>{
            res.status(200).json({ message: "update new votes to server successfully", data: "" });
            res.end();
        }).catch(error => {
              console.error(error)
              res.json(error);
              res.status(405).end();
        })
}