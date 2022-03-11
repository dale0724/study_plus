import {fetchWrapper} from "../../tools/fetchWrapper";
import {API_url} from "../../app_config";

export default class DiscussionClient{

    async delete_post_by_id(post_id){
        console.log("post_id:" + post_id)
        let body = {
            post_id
        }
        return fetchWrapper.delete(API_url.discussion_post, body)
    }
}