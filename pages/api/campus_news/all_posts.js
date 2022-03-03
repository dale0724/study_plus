import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
import NewsDTO from "../../../DTO/campus_news_post";
export default async function handler(req, res) {
    await fetchWrapper.get(API_url.get_all_campus_news_post).then(resPayload =>{
            const newsList = resPayload['data'].map(jsonData=>JSON.parse(jsonData))
            const newsDTOList = newsList.map(news =>
                JSON.stringify(NewsDTO.ObjectToInstance(news))
                )
            res.status(200).json({ message: "get news post from server successfully", data: newsDTOList });
            res.end();
        }).catch(error => {
              console.error(error)
              res.json(error);
              res.status(405).end();
        })
}