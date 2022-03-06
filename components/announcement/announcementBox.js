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
            <ListGroupItem key={postMetaData.id}>
                <AnnouncementCard metaData={postMetaData} />
            </ListGroupItem>)
            //console.log(boxContent)
        }
        else{
            boxContent = <MySpinner></MySpinner>
        }
    }
    const abstract = 'For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.'
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
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