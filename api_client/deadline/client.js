import DeadlineDTO from "../../DTO/deadline";
import useSWR from "swr";
import { fetcher } from "../../tools/fetchWrapper";
import { API_url } from "../../app_config";


export class DeadlineClient {
    /**
     *
     * @returns {{data:[DeadlineDTO]|null}, isLoading: boolean, isError: boolean}
     */
    static useDeadlinePostByEmail(email) {
        const {data, error} = useSWR(API_url.get_deadline_post_by_email+email, fetcher)
        var dto_list = null
        if(data){
            let postMetaDataList = data['data'].map(jsonData => JSON.parse(jsonData))
            dto_list = postMetaDataList.map(postMetaData => DeadlineDTO.objectToInstance(postMetaData))
        }
        return {
            data: dto_list,
            isLoading: !error && !data,
            isError: error,
        }
    }

    static addDeadlinePost(data) {
        const {data, error} = useSWR(API_url.add_new_deadline_post, fetcher)
        var dto_list = null
        if(data){
            let postMetaDataList = data['data'].map(jsonData => JSON.parse(jsonData))
            dto_list = postMetaDataList.map(postMetaData => DeadlineDTO.objectToInstance(postMetaData))
        }
        return {
            data: dto_list,
            isLoading: !error && !data,
            isError: error,
        }
    }

    static modifyDeadlinePostById(data) {
        const {data, error} = useSWR(API_url.modify_deadline_post, fetcher)
        var dto_list = null
        if(data){
            let postMetaDataList = data['data'].map(jsonData => JSON.parse(jsonData))
            dto_list = postMetaDataList.map(postMetaData => DeadlineDTO.objectToInstance(postMetaData))
        }
        return {
            data: dto_list,
            isLoading: !error && !data,
            isError: error,
        }
    }
}
