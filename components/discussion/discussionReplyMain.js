import React, {useState} from "react";
import {useRouter} from "next/router";
import useSWR, {mutate} from "swr";
import {API_url} from "../../app_config";
import {convertFromRaw, EditorState} from "draft-js";
import {fetchWrapper} from "../../tools/fetchWrapper";
import styles from "../../styles/post_id.module.css";
import {Col, Row} from "react-bootstrap";
import AvatarByEmail from "../AvatarByEmail";
import RichTextEditorWithoutImg from "../helpers/richTextEditorWithoutImg";
import UPVoteSVG from "./upVoteSVG";
import CommentHeader from "./commentHeader";
import DiscussionAddReply from "./discussionAddReply";
import DiscussionCommentBox from "./discussionCommentBox";

export default function DiscussionReplyMain(props) {
    var postComments = []
    //     [{
    //     id: '1', user_email: "yezhen974@gmail.com", content: "This is great!",
    //     votes: 2
    // }, {
    //     id: '2', user_email: "lihang0722@gmail.com",
    //     content: "This is awesome man!", votes: 1
    // }]
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const {data:replyData, error: replyError} = useSWR(API_url.get_discussion_post_reply + props.postID, fetcher)

    if (replyError) {
        return <h1>Error</h1>

    } else {
        if(replyData){
            const repliesDetail = replyData['data']
            //console.log(repliesDetail)
            if (repliesDetail.length!==0){
                repliesDetail.forEach(item => {
                        let parsedItem = JSON.parse(item)
                        //console.log(parsedItem)
                        const rawReply = JSON.parse(parsedItem.content)
                        //console.log(rawReply)
                        const currentReply = convertFromRaw(rawReply)
                        const replyEditorState = EditorState.createWithContent(currentReply)
                        parsedItem['content'] = replyEditorState
                        postComments.push(parsedItem)
                        //console.log(postComments)
                    }
                )
            }


        }
    }


    return (
        <>
            <CommentHeader commentLength={postComments.length}/>
            <DiscussionAddReply postID={props.postID}/>
            <DiscussionCommentBox replies={postComments}/>
        </>
    )
}