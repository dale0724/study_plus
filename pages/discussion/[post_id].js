import {useRouter} from 'next/router'
import {stateToHTML} from 'draft-js-export-html';
import {API_url} from '../../app_config';
import {convertFromRaw, convertToRaw, Editor, EditorState} from 'draft-js';
import MySpinner from '../../components/mySpinner';
import Layout from '../../components/layout';
import useSWR from 'swr';
import {fetchWrapper} from '../../tools/fetchWrapper';
import RichTextEditor from '../../components/helpers/richTextEditor';
import styles from "../../styles/post_id.module.css";
import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import AvatarByEmail from "../../components/AvatarByEmail";
import UPVoteSVG from "../../components/discussion/upVoteSVG";

export async function getServerSideProps() {

    // Pass data to the page via props
    return {props: {}}
}

export default function DiscussionDetailPage(props) {
    const router = useRouter();
    const {post_id} = router.query;
    var postTitle = '';
    var postVotes = 0
    var userEmail = ''
    var postComments = [{
        commentID: '1', userName: "ye zhen", userEmail: "yezhen974@gmail.com", comment: "This is great!",
        votes: 2, replyTo: 0
    }, {
        commentID: '2', userName: "Dale", userEmail: "lihang0722@gmail.com",
        comment: "This is awesome man!", votes: 1, replyTo: 0
    }]
    /* get postComments from db later*/

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const {data, error} = useSWR(API_url.get_discussion_post_by_id + post_id, fetcher)

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
    if (error) {
        return <h1>{error}</h1>
    } else {
        if (data) {
            const postDetail = JSON.parse(data['data'])
            const rawContent = JSON.parse(postDetail.content)
            postTitle = postDetail.title
            postVotes = postDetail.votes
            userEmail = postDetail.user_email
            const currentContent = convertFromRaw(rawContent)
            editorState = EditorState.createWithContent(currentContent)
        }
    }
    return (
        <>
            <Layout>
                <div className={`mx-auto w-50 ${styles.main}`}>
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
                                        <UPVoteSVG size={'30'}/>
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
                                        <h6 className={styles.lastEdit}>Last Edit Time:</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <RichTextEditor editorState={editorState} readOnly={true} editorKey="editor"/>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.commentHeader}>
                        <Row>
                            <div style={{width: '50px', display: "inline-block", marginLeft: '10px'}}>
                                <Col>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.77735 20.4818L3.36132 19.8577L3.77735 20.4818ZM21.75 16.5V4.5H20.25V16.5H21.75ZM9.15139 17.75H20.5V16.25H9.15139V17.75ZM4.19338 21.1058L9.29006 17.708L8.45801 16.4599L3.36132 19.8577L4.19338 21.1058ZM2.25 17V20.0657H3.75V17H2.25ZM2.25 14V17H3.75V14H2.25ZM2.25 4.5V14H3.75V4.5H2.25ZM20.5 3.25H3.5V4.75H20.5V3.25ZM3.36132 19.8577C3.52746 19.747 3.75 19.8661 3.75 20.0657H2.25C2.25 21.0641 3.36268 21.6596 4.19338 21.1058L3.36132 19.8577ZM9.15139 16.25C8.90461 16.25 8.66335 16.323 8.45801 16.4599L9.29006 17.708C9.249 17.7354 9.20074 17.75 9.15139 17.75V16.25ZM3.75 4.5C3.75 4.63807 3.63807 4.75 3.5 4.75V3.25C2.80964 3.25 2.25 3.80964 2.25 4.5H3.75ZM21.75 4.5C21.75 3.80965 21.1904 3.25 20.5 3.25V4.75C20.3619 4.75 20.25 4.63807 20.25 4.5H21.75ZM20.25 16.5C20.25 16.3619 20.3619 16.25 20.5 16.25V17.75C21.1904 17.75 21.75 17.1904 21.75 16.5H20.25Z"
                                            fill="black"/>
                                    </svg>
                                </Col>
                            </div>
                            <Col style={{paddingLeft: '0'}}><h6 style={{marginTop: "3px"}}>Comments</h6></Col>
                        </Row>
                    </div>
                    <div className={styles.commentBox}>
                        {postComments.map((item) => {
                            return (
                                <React.Fragment key={item.commentID}>
                                    <div className={styles.commentList}>
                                        <Row>
                                            <div className={styles.commentAvatarCol}>
                                                <Col>
                                                    <AvatarByEmail email={item.userEmail} size='50px' round={true}/>
                                                </Col>
                                            </div>
                                            <Col>
                                                <h6 className={styles.userEmail}>{item.userName}</h6>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className={styles.comment}>{item.comment}</div>
                                        </Row>
                                        <Row>
                                            <div className={styles.commentVote}>
                                                <Col>
                                                    <UPVoteSVG size='20'/>
                                                    {item.votes}
                                                </Col>
                                            </div>
                                            <Col>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 4L4.35355 7.64645C4.15829 7.84171 4.15829 8.15829 4.35355 8.35355L8 12"
                                                        stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <path
                                                        d="M5 8H14.5C17.5376 8 20 10.4624 20 13.5V13.5C20 16.5376 17.5376 19 14.5 19H5"
                                                        stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                                Reply
                                            </Col>
                                        </Row>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )

}
