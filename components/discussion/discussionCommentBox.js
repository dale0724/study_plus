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

export default function DiscussionCommentBox(props) {
    const [increase, setIncrease] = useState(true)
    const postComments = props.replies
    const reply_id = -1

    function handleVoteUp(event, replyID) {
        event.preventDefault();
        const increase = event.currentTarget.getAttribute('increase')
        console.log(increase)
        fetchWrapper.put(API_url.discussion_reply_add_vote_number,
            {
                reply_id: replyID,
                increase: increase
            }).then(() => {
            mutate(API_url.get_discussion_post_reply + post_id)
        })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <div className={styles.commentBox}>
            {postComments.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        <div className={styles.commentList}>
                            <Row>
                                <div className={styles.commentAvatarCol}>
                                    <Col>
                                        <AvatarByEmail email={item.user_email} size='50px' round={true}/>
                                    </Col>
                                </div>
                                <Col>
                                    <h6 className={styles.userEmail}>{item.user_email}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <div className={styles.comment}>
                                    <RichTextEditorWithoutImg editorState={item.content} readOnly={true} editorKey="editor"/>
                                </div>
                            </Row>
                            <Row>
                                <div className={styles.commentVote}>
                                    <Col>
                                        <span onClick={(e) => {
                                        handleVoteUp(e, item.id)}}>
                                            <UPVoteSVG size='20'/></span>
                                        {item.votes}
                                    </Col>
                                </div>
                            </Row>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    )
}