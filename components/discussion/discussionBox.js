import styles from "../../styles/discussionBox.module.css";
import { Card, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import Link from "next/link";
import React, { useState } from "react";
import DiscussionCard from "./discussionCard";
import DiscussionAddModal from "./discussionAddModal";
import { useLoggedUserData } from "../../tools/helper";
import useSWR from "swr";
import { API_url } from "../../app_config";
import MySpinner from "../mySpinner";

export default function DiscussionBox() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(API_url.get_all_discussion_posts_meta, fetcher)
    var boxContent
    if(error){
        boxContent = "Error"
    }
    else{
         if (data) {
        const postMetaDataList = data['data'].map(jsonData=>JSON.parse(jsonData))
        boxContent = postMetaDataList.map(postMetaData =>
            <ListGroupItem key={postMetaData.id}>
                <DiscussionCard metaData={postMetaData} />
            </ListGroupItem>)
            //console.log(boxContent)
        }
        else{
            boxContent = <MySpinner></MySpinner>
        }
    }
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-2">
                    <Card className={`justify-content-between border-0 ${styles.titleCard}`}>
                        <div>
                            <Link href="#mostRelevant" passHref><a className={styles.titleText}>Most Relevant</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                            <Link href="#mostRecent" passHref><a className={styles.titleText}>Most Recent</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                            <Link href="#mostVotes" passHref><a className={styles.titleText}>Most Votes</a></Link>
                        </div>
                        <div>
                            <a className={styles.addNew} style={{ cursor: "pointer" }} onClick={handleShow}>New +</a>
                        </div>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '600px', width: '95%', margin: 'auto' }}>
                    {
                       boxContent
                    }
                </ListGroup>
                <DiscussionAddModal show={show} handleClose={handleClose}></DiscussionAddModal>
            </div>
        </>
    );
}