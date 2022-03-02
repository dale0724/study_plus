import React from "react";
import useSWR from "swr";
import {API_url} from "../../app_config";
import {convertFromRaw, EditorState} from "draft-js";
import CommentHeader from "./commentHeader";
import DiscussionAddReply from "./discussionAddReply";
import DiscussionCommentBox from "./discussionCommentBox";

export default function DiscussionReplyMain(props) {
    var postComments = []
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const {data:replyData, error: replyError} = useSWR(API_url.get_discussion_post_reply + props.postID, fetcher)

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
            <DiscussionAddReply postID={props.postID}/>
            <DiscussionCommentBox replies={postComments} postID={props.postID}/>
        </>
    )
}