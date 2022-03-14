import styles from "../../styles/indexSwappingRequestBox.module.css";
import { Card, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import React, { useState } from "react";
import IndexSwappingCard from "./indexSwappingCard";
import MySpinner from "../mySpinner";
import { IndexSwappingClient } from "../../api_client/index_swapping/client";
import {useLoggedUserData} from "../../tools/helper";


export default function IndexSwappingRequestBox() {
    const [displayState, SetState] = useState('all');
    const { user } = useLoggedUserData()
    let boxContent = '';

    function makeBoxContent(dataList, isLoading, error){
        if(error){
            return "Error"
        }else{
            if (!isLoading) {
                return dataList.map(post =>
                    <ListGroupItem key={ post.id } className={styles.cardBorder}>
                        <IndexSwappingCard metaData={post} />
                    </ListGroupItem>
                )
            } else {
                return <MySpinner/>
            }
        }
    }

    switch (displayState){
        case 'all':
        {
            const { data, isLoading, isError} = IndexSwappingClient.useAllIndexSwappingPosts()
            boxContent = makeBoxContent(data, isLoading, isError)
            break
        }

        case 'my':
        {
            const { data, isLoading, isError } = IndexSwappingClient.useIndexSwappingPostsByEmail(user.email)
            boxContent = makeBoxContent(data, isLoading, isError)
            break
        }

        case 'matched':
        {
            const { data, isLoading, isError } = IndexSwappingClient.useIndexSwappingPostsMatchedByEmail(user.email)
            boxContent = makeBoxContent(data, isLoading, isError)
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
                        <a className={styles.titleText} style={{ cursor: "pointer" }} onClick={() => { SetState('matched') }}>Matched Request</a>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '90%', width: '95%', margin: 'auto' }}>
                    {boxContent}
                </ListGroup>
            </div>
        </>
    );
}