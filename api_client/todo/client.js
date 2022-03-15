
import useSWR from "swr";
import { fetcher } from "../../tools/fetchWrapper";
import { API_url } from "../../app_config";
import TodoDTO from "../../DTO/todo";
import {useLoggedUserData} from "../../tools/helper";


export class TodoClient {

    /**
     *
     * @returns {{data:[TodoDTO]|null}, isLoading: boolean, isError: boolean}
     */
    static useTodoPosts() {
        const {user} = useLoggedUserData()
        const {data, error} = useSWR(API_url.get_todos_by_email + user.email, fetcher)
        let dto_list = null;
        if (data) {
            let postDataList = data['data'].map(jsonData => JSON.parse(jsonData))
            dto_list = postDataList.map(postMetaData => TodoDTO.ObjectToInstance(postMetaData))
        }
        return {
            data: dto_list,
            isLoading: !error && !data,
            isError: error,
        }
    }
}