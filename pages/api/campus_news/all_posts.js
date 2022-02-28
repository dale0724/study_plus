import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
import newsDTO from "../../../DTO/campus_news";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        await fetchWrapper.get(API_url.get_all_campus_news_post).then(resPayload =>{
        const newsList = resPayload['data'].map(jsonData=>JSON.parse(jsonData))
        const newsDTOList = newsList.map(news =>
            JSON.stringify(new newsDTO(news.id, news.user_email, news.latitude, news.longitude, news.title, news.content))
        )
        res.status(200).json({ message: "get news post from server successfully", data: newsDTOList })
        }).catch(error => {
              console.error(error)
        })
        return
    }
}