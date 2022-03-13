import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
import NewsReplyDTO from "../../../DTO/campus_news_reply";
export default async function handler(req, res) {
    await fetchWrapper.get(API_url.get_campus_news_post_reply, req.body).then(resPayload =>{
            const newsReplyList = resPayload['data'].map(jsonData=>JSON.parse(jsonData))
            const newsReplyDTOList = newsReplyList.map(news =>
                JSON.stringify(NewsReplyDTO.ObjectToInstance(news))
                )
            res.status(200).json({ message: "get news post reply from server successfully", data: newsReplyDTOList });
            res.end();
        }).catch(error => {
              console.error(error)
              res.json(error);
              res.status(405).end();
        })
}