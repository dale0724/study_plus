import React from "react";
import styles from "../../styles/post_id.module.css";
import {Col, Row} from "react-bootstrap";
import AvatarByEmail from "../AvatarByEmail";
import RichTextEditorWithoutImg from "../helpers/richTextEditorWithoutImg";
import UPVoteSVG from "./upVoteSVG";

export default function CommentBox(props) {
    const postComments = props.replies
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
                                            <UPVoteSVG type='reply' id={item.id} size='20'
                                                       APIPutPath={props.apiUpVoteUrl} APIMutatePath={props.apiMutateUrl+props.postID}/>
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