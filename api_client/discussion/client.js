import {fetcher, fetchWrapper} from "../../tools/fetchWrapper";
import {API_url, self_host} from "../../app_config";
import useSWR from "swr";
import DiscussionPostDTO from "../../DTO/discussion";
import IndexSwappingDTO from "../../DTO/index_swapping";

export default class DiscussionClient{

    async delete_post_by_id(post_id){
        console.log("post_id:" + post_id)
        let body = {
            post_id
        }
        return fetchWrapper.delete(self_host+"api/discussion/post", body)
    }

    /**
     *
     * @param offset
     * @param quantity_limit
     * @returns {{isLoading: boolean, isError: any, data: [DiscussionPostDTO]}}
     */
    static use_posts_with_offset_and_quantity_limit(offset, quantity_limit){
        const url = self_host + `api/discussion/post?offset=${offset}&quantity_limit=${quantity_limit}`
        const {data, error} = useSWR(url, fetcher)
        let dto_list = null;
        if(data){
            dto_list = data['data'].map(jsonData => DiscussionPostDTO.JSONToInstance(jsonData))
        }
        return {
            data: dto_list,
            isLoading: !error && !data,
            isError: error,
        }
    }

    static useAllDiscussionPosts(){
        const {data, error} = useSWR(API_url.get_all_discussion_posts_meta, fetcher)
        var dto_list = null
        if(data){
            let postMetaDataList = data['data'].map(jsonData => JSON.parse(jsonData))
            dto_list = postMetaDataList.map(postMetaData => DiscussionPostDTO.ObjectToInstance(postMetaData))
            console.debug("DiscussionPostsAll:" + dto_list)
        }
        return {
            data: dto_list,
            isLoading: !error && !data,
            isError: error,
        }
    }

}