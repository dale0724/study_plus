import {API_url} from "../../../app_config";
import { fetchWrapper } from "../../../tools/fetchWrapper";
import DeadlineDTO from "../../../DTO/deadline";
export default async function handler(req, res) {
    await fetchWrapper.get(API_url.get_deadline_post_by_email+req.body).then(resPayload =>{
        const deadlineList = resPayload['data'].map(jsonData=>JSON.parse(jsonData))
        const deadlineDTOList = deadlineList.map(deadline =>
            JSON.stringify(DeadlineDTO.ObjectToInstance(deadline))
        )
        res.status(200).json({ message: "get deadline post from server successfully", data: deadlineDTOList });
        res.end();
    }).catch(error => {
        console.error(error)
        res.json(error);
        res.status(405).end();
    })
}