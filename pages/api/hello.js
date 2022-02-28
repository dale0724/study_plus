import { API_url } from "../../app_config";
import { fetchWrapper } from "../../tools/fetchWrapper";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await fetchWrapper.get("http://192.168.1.104:5000/").then(resPayload =>{
            res.status(200).json({ message: resPayload.message })
        })
        // const resPayload = await fetchWrapper.get("http://192.168.1.104:5000/")
        // res.status(200).json({ message: resPayload.message })
        return
    }
}
