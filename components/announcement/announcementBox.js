import { Card,Row } from "react-bootstrap";
import styles from "../../styles/AnnouncementBox.module.css";
import { ListGroup,ListGroupItem } from "react-bootstrap";
import AnnouncementCard from "./announcementCard";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import MySpinner from "../mySpinner";



export default function AnnouncementBox(){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR('http://localhost:3000/api/announcement/all_posts', fetcher)
    var boxContent
    if(error){
        boxContent = "Error"
    }
    else{
         if (data) {
        const postMetaDataList = data['data'].map(jsonData=>JSON.parse(jsonData))
        boxContent = postMetaDataList.map(postMetaData =>
            <ListGroupItem key={postMetaData.id} className={styles.cardBorder}>
                <AnnouncementCard metaData={postMetaData} />
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
                <Row className="m-0">
                    <Card className={styles.titleCard}>
                        <Link href="/announcement" passHref><a className={styles.titleText}>Announcement</a></Link>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '300px',width: '95%', margin: 'auto'}}>
                    {
                       boxContent
                    }
                </ListGroup>
            </div>
        </>
    );
}