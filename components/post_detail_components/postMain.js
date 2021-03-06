import React from "react";
import useSWR from "swr";
import {convertFromRaw, EditorState} from "draft-js";
import styles from "../../styles/post_id.module.css";
import {Button, Col, Row} from "react-bootstrap";
import Link from "next/link";
import UPVoteSVG from "./upVoteSVG";
import AvatarByEmail from "../AvatarByEmail";
import RichTextEditor from "../helpers/richTextEditor";
import {fetcher} from "../../tools/fetchWrapper";
import PropTypes from "prop-types";
import {API_url} from "../../app_config";
import {useLoggedUserData} from "../../tools/helper";
import DiscussionClient from "../../api_client/discussion/client";
import {useRouter} from "next/router";
import CampusNewsClient from "../../api_client/campus_news/client";

export default function PostMain(props) {
    const router = useRouter()

    let show = false
    const {user} = useLoggedUserData()

    let postTitle = '';
    let postVotes = 0;
    let userEmail = '';
    let createdTime = '';
    let getDataURL = ''
    let voteURL = ''
    let apiClient = undefined

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

    switch (props.contentType) {
        case "discussion":
            getDataURL = API_url.get_discussion_post_by_id
            voteURL = API_url.discussion_vote
            apiClient = new DiscussionClient()
            break
        case "campusNews":
            getDataURL = API_url.get_campus_news_post_by_id
            voteURL = API_url.campus_news_vote
            apiClient = new CampusNewsClient()
            break
    }

    console.log(getDataURL)
    const {data: postData, error: getPostError} = useSWR(getDataURL + props.postID, fetcher)

    if (getPostError) {
        console.error(getPostError)
        return <h1>Error</h1>
    } else {
        let rawContent;
        if (postData) {
            console.log('post data:' + postData)
            const postDetail = JSON.parse(postData['data'])
            console.log(postDetail)
            try {
                rawContent = JSON.parse(postDetail.content);
            } catch (e) {
                console.log(e)
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

            if (user && user.email === userEmail){
                show = true
            }
        }
    }

    function handleDelete() {
        apiClient.delete_post_by_id(props.postID).then(() => {
            alert("deleted!")
            router.back()
        }).catch(e => console.error(e))
    }

    const deleteButton = <Button variant="outline-dark"
                                 style={{marginTop: "1rem", marginBottom: "1rem", marginRight: "1rem"}}
                                 onClick={handleDelete}>
        Delete
    </Button>


    return (
        <>
            <div className={styles.titleBox}>
                <Row>
                    <div style={{width: "120px"}}>
                        <Col>
                            <Link href={props.backHref} passHref>
                                <h5 className={styles.back}>{`<<`} Back</h5>
                            </Link>
                        </Col>
                    </div>
                    <div style={{width: "50px"}}>
                        <Col>
                            <h5 style={{marginTop: "1rem", marginBottom: "1rem", color: "#7BA1C7"}}>|</h5>
                        </Col>
                    </div>
                    <Col>
                        <h5 style={{marginTop: "1rem", marginBottom: "1rem", color: "#7BA1C7"}}>{postTitle}</h5>
                    </Col>
                    <Col style={{textAlign: "right"}}>
                        {show && deleteButton}
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