import React from "react";
import useSWR from "swr";
import {convertFromRaw, EditorState} from "draft-js";
import CommentHeader from "./commentHeader";
import AddCommentBox from "./addCommentBox";
import CommentBox from './commentBox'

export default function ReplyMain(props) {
    var postComments = []
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const {data:replyData, error: replyError} = useSWR(props.apiGetUrl + props.postID, fetcher)

    if (replyError) {
        return <h1>Error</h1>

    } else {
        if(replyData){
            const repliesDetail = replyData['data']
            if (repliesDetail.length!==0){
                repliesDetail.forEach(item => {
                        let parsedItem = JSON.parse(item)
                        const rawReply = JSON.parse(parsedItem.content)
                        const currentReply = convertFromRaw(rawReply)
                        const replyEditorState = EditorState.createWithContent(currentReply)
                        parsedItem['content'] = replyEditorState
                        postComments.push(parsedItem)
                    }
                )
            }
        }
    }


    return (
        <>
            <CommentHeader commentLength={postComments.length}/>
            <AddCommentBox postID={props.postID} type={props.type} apiAddReplyUrl={props.apiAddReplyUrl} apiMutateUrl={props.apiGetUrl}/>
            <CommentBox replies={postComments} postID={props.postID} apiUpVoteUrl={props.apiUpVoteUrl}
            apiMutateUrl={props.apiGetUrl}/>
        </>
    )
}