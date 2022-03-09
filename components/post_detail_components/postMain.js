import React from "react";
import useSWR from "swr";
import {convertFromRaw, EditorState} from "draft-js";
import styles from "../../styles/post_id.module.css";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import UPVoteSVG from "./upVoteSVG";
import AvatarByEmail from "../AvatarByEmail";
import RichTextEditor from "../helpers/richTextEditor";
import {fetcher} from "../../tools/fetchWrapper";
import PropTypes from "prop-types";
import {API_url} from "../../app_config";

export default function PostMain(props) {

    let postTitle = '';
    let postVotes = 0;
    let userEmail = '';
    let createdTime = '';
    let getDataURL = ''
    let voteURL = ''

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
    let editorState = EditorState.createWithContent(emptyContentState);

    switch (props.contentType){
        case "discussion":
            getDataURL = API_url.get_discussion_post_by_id
            voteURL = API_url.discussion_vote
            break
        case "campusNews":
            getDataURL = API_url.get_campus_news_post_by_id
            voteURL = API_url.campus_news_vote
            break
    }

    console.log(getDataURL)
    const {data: postData, error: getPostError} = useSWR(getDataURL+ props.postID, fetcher)

    if (getPostError) {
        console.error(getPostError)
        return <h1>Error</h1>
    } else {
        let rawContent;
        if (postData) {
            console.log('post data:' + postData)
            const postDetail = JSON.parse(postData['data'])
            try {
                rawContent = JSON.parse(postDetail.content);
            } catch(e) {
                rawContent = {
                    entityMap: {},
                    blocks: [
                        {
                            text: postDetail.content,
                            key: 'foo',
                            type: 'unstyled',
                            entityRanges: [],
                        },
                    ],
                }
            }
            const currentContent = convertFromRaw(rawContent)
            editorState = EditorState.createWithContent(currentContent)
            postTitle = postDetail.title
            postVotes = postDetail.votes
            userEmail = postDetail.user_email
            createdTime = postDetail.create_time
        }
    }


    return (
        <>
            <div className={styles.titleBox}>
                <Row>
                    <div style={{width: "120px"}}>
                        <Col><Link href={props.backHref} passHref><h5 className={styles.back}>{`<<`} Back</h5>
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
                                <UPVoteSVG type='post' id={parseInt(props.postID)} size={'30'}
                                           APIPutPath={voteURL} APIMutatePath={getDataURL + props.postID}/>
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

PostMain.prototype = {
    postID: PropTypes.number.isRequired,
    backHref: PropTypes.string.isRequired,
    contentType: PropTypes.oneOf(['discussion', 'campusNews'])
}