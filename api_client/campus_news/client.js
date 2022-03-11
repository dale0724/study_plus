import {fetchWrapper} from "../../tools/fetchWrapper";
import {self_host} from "../../app_config";

export default class CampusNewsClient{

    async delete_post_by_id(post_id){
        console.log("post_id:" + post_id)
        let body = {
            post_id
        }
        return fetchWrapper.delete(self_host+"api/campus_news/post", body)
    }
}