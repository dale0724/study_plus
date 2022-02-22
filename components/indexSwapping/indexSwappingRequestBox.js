import styles from "../../styles/indexSwappingRequestBox.module.css";
import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import IndexSwappingRequestCard from "./indexSwappingRequestCard";
import Link from "next/link";
import React from "react";
import { API_url } from "../../app_config";
import IndexSwappingCard from "./indexSwappingCard";
import useSWR from "swr";
import MySpinner from "../mySpinner";

export default function IndexSwappingRequestBox(){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(API_url.get_all_index_swapping_posts, fetcher)
    var boxContent
    if(error){
        boxContent = "Error"
    }
    else{
         if (data) {
        const postMetaDataList = data['data'].map(jsonData=>JSON.parse(jsonData))
        boxContent = postMetaDataList.map(postMetaData =>
            <ListGroupItem key={postMetaData.id}>
                <IndexSwappingCard metaData={postMetaData} />
            </ListGroupItem>)
    }
    else{
        boxContent = <MySpinner></MySpinner>
    }
    }
    return (
        <>
            <div className={`mt-3 ${styles.border}`} style={{  height: '70vh'}} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <Link href="#myRequests" passHref><a className={styles.titleText}>My Requests</a></Link>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <Link href="#allRequests" passHref><a className={styles.titleText}>All Pending Requests</a></Link>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '90%', width: '95%', margin: 'auto'}}>
                    {boxContent}
                </ListGroup>
            </div>
        </>
    );
}