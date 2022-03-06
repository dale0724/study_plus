import IndexSwappingDTO from "../../DTO/index_swapping";
import useSWR from "swr";
import { useState } from "react";
import { fetcher } from "../../tools/fetchWrapper";
import { API_url } from "../../app_config";


export class IndexSwappingClient {
    useHello() {
        const { data, error } = useSWR("/api/hello", fetcher)
        return {
            data: data,
            isLoading: !error && !data,
            isError: error,
        }
    }
    /**
     * 
     * @returns {{data:[IndexSwappingDTO]|null}, isLoading: boolean, isError: boolean}
     */
    static useAllIndexSwappingPosts() {
        const {data, error} = useSWR(API_url.get_all_index_swapping_posts, fetcher)
        var dto_list = null
        if(data){
            let postMetaDataList = data['data'].map(jsonData => JSON.parse(jsonData))
            dto_list = postMetaDataList.map(postMetaData => IndexSwappingDTO.objectToInstance(postMetaData))
        }
        return {
            data: dto_list,
            isLoading: !error && !data,
            isError: error,
        }
    }
}
