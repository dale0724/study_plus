import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
import AnnouncementDTO from "../../../DTO/announcement";
export default async function handler(req, res) {
    await fetchWrapper.get(API_url.get_all_announcement_post).then(resPayload =>{
            const announcementList = resPayload['data'].map(jsonData=>JSON.parse(jsonData))
            const announcementDTOList = announcementList.map(news =>
                JSON.stringify(AnnouncementDTO.ObjectToInstance(news))
                )
            res.status(200).json({ message: "get announcement post from server successfully", data: announcementDTOList });
            res.end();
        }).catch(error => {
              console.error(error)
              res.json(error);
              res.status(405).end();
        })
}