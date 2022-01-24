import Avatar,{Cache} from "react-avatar"
import { useLoggedUserData } from "../tools/helper"
import { API_url } from "../app_config"
export default function UserAvatar(props){
    const cache = new Cache({

        // Keep cached source failures for up to 7 days
        sourceTTL: 0,
    
        // Keep a maximum of 20 entries in the source cache
        sourceSize: 20
    });
    
    const {user, isLoading, isError} = useLoggedUserData()
    if(isLoading || isError){
        return <Avatar name="Dale" {...props} cache={cache}/>
    }
    return <Avatar src={API_url.avatar+user.email}  {...props} cache={cache}/>
}