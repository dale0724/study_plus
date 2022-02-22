import React from "react";
import useSWR from "swr";
import {API_url} from "../../app_config";
import {convertFromRaw, EditorState} from "draft-js";
import styles from "../../styles/post_id.module.css";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import UPVoteSVG from "./upVoteSVG";
import AvatarByEmail from "../AvatarByEmail";
import RichTextEditor from "../helpers/richTextEditor";

export default function DiscussionPostMain(props) {
    var postTitle = '';
    var postVotes = 0
    var userEmail = ''
    var createdTime = ''

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const {data: commentData, error: commentError} = useSWR(API_url.get_discussion_post_by_id + props.postID, fetcher)
    const emptyContentState = convertFromRaw({
        entityMap: {},
        blocks: [
            {
                text: '',
                key: 'foo',
                type: 'unstyled',
                entityRanges: [],
            },
        ],
    });
    var editorState = EditorState.createWithContent(emptyContentState)
    if (commentError) {
        return <h1>Error</h1>
    } else {
        if (commentData) {
            const postDetail = JSON.parse(commentData['data'])
            const rawContent = JSON.parse(postDetail.content)
            postTitle = postDetail.title
            postVotes = postDetail.votes
            userEmail = postDetail.user_email
            createdTime = postDetail.create_time
            const currentContent = convertFromRaw(rawContent)
            editorState = EditorState.createWithContent(currentContent)
        }
    }


    return (
        <>
            <div className={styles.titleBox}>
                <Row>
                    <div style={{width: "120px"}}>
                        <Col><Link href="/discussion" passHref><h5 className={styles.back}>{`<<`} Back</h5>
                        </Link></Col>
                    </div>
                    <div style={{width: "50px"}}>
                        <Col><h5 style={{marginTop: "1rem", marginBottom: "1rem", color: "#7BA1C7"}}>|</h5>
                        </Col>
                    </div>
                    <Col><h5
                        style={{marginTop: "1rem", marginBottom: "1rem", color: "#7BA1C7"}}>{postTitle}</h5>
                    </Col>
                </Row>
            </div>
            <div className={styles.contentBox}>
                <Row style={{margin: "1rem", width: "850px"}}>
                    <div className={styles.voteCol}>
                        <Col>
                            <Row>
                                        <UPVoteSVG type='post' id={props.postID} size={'30'}
                                                   APIPutPath={API_url.discussion_add_vote_number} APIMutatePath={API_url.get_discussion_post_by_id + props.postID}/>
                            </Row>
                            <Row><h5 className={styles.voteNum}>{postVotes}</h5></Row>
                        </Col>
                    </div>
                    <Col>
                        <Row>
                            <div style={{padding: '0', margin: "1rem", width: "50px"}}>
                                <Col style={{padding: '0'}}>
                                    <AvatarByEmail email={userEmail} size='50px' round={true}/>
                                </Col></div>
                            <Col>
                                <h6 className={styles.userEmail}>{userEmail}</h6>
                            </Col>
                            <Col>
                                <h6 className={styles.createdOn}>Created On: {createdTime}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <RichTextEditor editorState={editorState} readOnly={true} editorKey="editor"/>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}
