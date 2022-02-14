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

export async function getServerSideProps() {
  
    // Pass data to the page via props
    return { props: {}}
  }


export default function DiscussionDetailPage(props){
    const router = useRouter()
    const {post_id} = router.query
    var postTitle = ''
    var postVotes = 0
    
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
                            <div style={{width: "100px"}}>
                            <Col><h5 style={{marginTop: "1rem", marginBottom: "1rem"}}>《 Back</h5></Col>
                            </div>
                            <div style={{width: "50px"}}>
                            <Col><h5 style={{marginTop: "1rem", marginBottom: "1rem"}}>|</h5></Col>
                            </div>
                            <Col><h5 style={{marginTop: "1rem", marginBottom: "1rem"}}>{postTitle}</h5></Col>
                        </Row>
                    </div>
                    <div className={styles.contentBox}>
                        <Row style={{ margin: "1rem", width:"850px"}}>
                            <div className={styles.voteCol}>
                            <Col>
                                <Row>placeholder for up vote</Row>
                                <Row><h5>{postVotes}</h5></Row>
                                <Row>placeholder for down vote</Row>
                            </Col>
                            </div>
                            <Col>
                            <RichTextEditor editorState={editorState} readOnly={true}  editorKey="editor"/>
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