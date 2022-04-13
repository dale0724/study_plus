import Avatar,{Cache} from "react-avatar"
import { API_url } from "../app_config"
import React from "react";
export default function AvatarByEmail(props){
    const cache = new Cache({

        // Keep cached source failures for up to 7 days
        sourceTTL: 0,
        // Keep a maximum of 20 entries in the source cache
        sourceSize: 0
    });
    return <Avatar src={API_url.avatar+props.email}  {...props} cache={cache}/>
}