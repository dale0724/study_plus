import {fetchWrapper} from "../../tools/fetchWrapper";

export default class DiscussionClient{

    async delete_post_by_id(post_id){
        console.log("post_id:" + post_id)
        let body = {
            post_id
        }
        return fetchWrapper.delete(self_host+"api/discussion/post", body)
    }
}