import { useRouter } from 'next/router'
import {stateToHTML} from 'draft-js-export-html';
import { API_url } from '../../app_config';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import MySpinner from '../../components/mySpinner';
import Layout from '../../components/layout';
import useSWR from 'swr';
import { fetchWrapper } from '../../tools/fetchWrapper';
import RichTextEditor from '../../components/discussion/richTextEditor';
import styles from "../../styles/post_id.module.css";
import React from "react";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import UserAvatar from '../../components/userAvatar';

export async function getServerSideProps() {
  
    // Pass data to the page via props
    return { props: {}}
  }


export default function DiscussionDetailPage(props){
    const router = useRouter()
    const {post_id} = router.query
    var postTitle = ''
    var postVotes = 0
    var userEmail = ''
    
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(API_url.get_discussion_post_by_id + post_id, fetcher)

    var editorState = EditorState.createWithContent(emptyContentState)
    if(error){
        return <h1>{error}</h1>
    }
    else{
        if(data){
            const postDetail = JSON.parse(data['data'])
            const rawContent =  JSON.parse(postDetail.content)
            postTitle = postDetail.title
            postVotes = postDetail.votes
            userEmail = postDetail.user_email
            console.log(rawContent)
            const currentContent = convertFromRaw(rawContent)
            editorState = EditorState.createWithContent(currentContent)
        }
    }
    return (
        <>
            <Layout>
                <div className={`mx-auto w-50 ${styles.main}`} >
                    <div className={styles.titleBox} >
                        <Row>
                            <div style={{width: "120px"}}>
                                <Col><Link href="/discussion" passHref><h5 className={styles.back}>{`<<`} Back</h5></Link></Col>
                            </div>
                            <div style={{width: "50px"}}>
                            <Col><h5 style={{marginTop: "1rem", marginBottom: "1rem", color: "#7BA1C7"}}>|</h5></Col>
                            </div>
                            <Col><h5 style={{marginTop: "1rem", marginBottom: "1rem", color: "#7BA1C7"}}>{postTitle}</h5></Col>
                        </Row>
                    </div>
                    <div className={styles.contentBox}>
                        <Row style={{ margin: "1rem", width:"850px"}}>
                            <div className={styles.voteCol}>
                            <Col>
                                <Row><svg id="upVote" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={changeSVGColor}>
                                    <path d="M7.57256 20.9999H4.82902C4.34394 20.9999 3.87872 20.8102 3.53571 20.4727C3.1927 20.1351 3 19.6773 3 19.1999V12.8999C3 12.4226 3.1927 11.9647 3.53571 11.6272C3.87872 11.2896 4.34394 11.0999 4.82902 11.0999H7.57256M13.9741 9.29996V5.69998C13.9741 4.9839 13.6851 4.29715 13.1706 3.79081C12.6561 3.28446 11.9582 3 11.2306 3L7.57256 11.0999V20.9999H17.8882C18.3293 21.0048 18.7574 20.8527 19.0935 20.5715C19.4296 20.2903 19.6511 19.8991 19.7173 19.4699L20.9793 11.3699C21.0191 11.112 21.0014 10.8486 20.9275 10.598C20.8535 10.3474 20.7251 10.1156 20.5512 9.91872C20.3772 9.72182 20.1618 9.5645 19.9199 9.45765C19.678 9.35081 19.4154 9.29701 19.1503 9.29996H13.9741Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                </Row>
                                <Row><h5 className={styles.voteNum}>{postVotes}</h5></Row>
                            </Col>
                            </div>
                            <Col>
                                <Row>
                                    <div style={{padding: '0', margin: "1rem", width: "50px"}}>
                                    <Col style={{padding: '0'}}>
                                        <UserAvatar size= '50px' round={true} />
                                    </Col></div>
                                    <Col>
                                        <h6 className={styles.userEmail}>{userEmail}</h6>
                                    </Col>
                                    <Col>
                                        <h6 className={styles.lastEdit}>Last Edit Time:</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <RichTextEditor editorState={editorState} readOnly={true}  editorKey="editor"/>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Layout>
        </>
    )
}

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

function changeSVGColor() {
    [...document.getElementById('upVote').querySelectorAll('*')].forEach((e) => {
        if (e.getAttribute('fill')=="none"){
            e.setAttribute('fill', '#7BA1C7');
        }else{
            e.setAttribute('fill', 'none');
        }

    });
}