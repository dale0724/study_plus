import styles from "../../styles/indexSwappingRequestBox.module.css";
import { Card, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import React, { useState } from "react";
import { API_url } from "../../app_config";
import IndexSwappingCard from "./indexSwappingCard";
import useSWR from "swr";
import MySpinner from "../mySpinner";
import { IndexSwappingClient } from "../../api_client/index_swapping/client";


export default function IndexSwappingRequestBox() {
    const [displayState, SetState] = useState('all');
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: user } = useSWR('/api/auth', fetcher);
    var boxContent = ''
    if (displayState == 'all') {
        const { data: allRequestData, isLoading, isError: allRequestErr } = IndexSwappingClient.useAllIndexSwappingPosts()
        // const {data:allRequestData, error: allRequestErr} = useSWR(API_url.get_all_index_swapping_posts, fetcher)
        if (allRequestErr) {
            boxContent = "Error"
        } else {
            if (!isLoading) {
                // const postMetaDataList = allRequestData['data'].map(jsonData => JSON.parse(jsonData))
                // boxContent = postMetaDataList.map(postMetaData =>
                //     <ListGroupItem key={postMetaData.id}>
                //         <IndexSwappingCard metaData={postMetaData}/>
                //     </ListGroupItem>)
                boxContent = allRequestData.map(post =>
                    <ListGroupItem key={ post.id } className={styles.cardBorder}>
                        <IndexSwappingCard metaData={post} />
                    </ListGroupItem>
                 )
            } else {
                boxContent = <MySpinner></MySpinner>
            }
        }
    } else if (displayState == 'my') {
        const { data: myRequestData, error: myRequestErr } = useSWR(() => API_url.get_my_index_swapping_posts_by_email + user.email, fetcher)
        if (myRequestErr) {
            boxContent = "Error"
        } else {
            if (myRequestData) {
                const postMetaDataList = myRequestData['data'].map(jsonData => JSON.parse(jsonData))
                boxContent = postMetaDataList.map(postMetaData =>
                    <ListGroupItem key={postMetaData.id} className={styles.cardBorder}>
                        <IndexSwappingCard metaData={postMetaData} />
                    </ListGroupItem>)
            } else {
                boxContent = <MySpinner></MySpinner>
            }
        }
    }
    else if (displayState == 'matched') {
        const { data: matchedRequestData, error: matchedRequestErr } = useSWR(() => API_url.get_matched_index_swapping_posts_by_email + user.email, fetcher)
        if (matchedRequestErr) {
            boxContent = "Error"
        } else {
            if (matchedRequestData) {
                const postMetaDataList = matchedRequestData['data'].map(jsonData => JSON.parse(jsonData))
                boxContent = postMetaDataList.map(postMetaData =>
                    <ListGroupItem key={postMetaData.id} className={styles.cardBorder}>
                        <IndexSwappingCard metaData={postMetaData} />
                    </ListGroupItem>)
            } else {
                boxContent = <MySpinner></MySpinner>
            }
        }
    }

    return (
        <>
            <div className={`mt-3 ${styles.border}`} style={{ height: '70vh' }}>
                <Row className="m-0">
                    <Card className={styles.titleCard}>
                        <a className={styles.titleText} style={{ cursor: "pointer" }} onClick={() => { SetState('all') }}>All Pending Requests</a>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <a className={styles.titleText} style={{ cursor: "pointer" }} onClick={() => { SetState('my') }}>My Requests</a>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <a className={styles.titleText} style={{ cursor: "pointer" }} onClick={() => { SetState('matched') }}>All Pending
                            Requests</a>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '90%', width: '95%', margin: 'auto' }}>
                    {boxContent}
                </ListGroup>
            </div>
        </>
    );
}