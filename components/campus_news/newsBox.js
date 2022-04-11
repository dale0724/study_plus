import {Card, ListGroup, ListGroupItem, Row, Col} from "react-bootstrap";
import styles from "../../styles/NewsBox.module.css";
import Button from 'react-bootstrap/Button';
import NewsCard from "./newsCard";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import AnnouncementCard from "../announcement/announcementCard";
import MySpinner from "../mySpinner";

export default function NewsBox() {
    const abstract = 'For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.'
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR('http://localhost:3000/api/campus_news/all_posts', fetcher)
    var boxContent
    if(error){
        boxContent = "Error"
    }
    else{
        if (data) {
            const postMetaDataList = data['data'].map(jsonData=>JSON.parse(jsonData))
            boxContent = postMetaDataList.map(postMetaData =>
                <ListGroupItem key={postMetaData.id} className={styles.cardBorder}>
                    <NewsCard metaData={postMetaData} />
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
                        <Row  style={{width: "100%"}}>
                            <div style={{width: "80%", textAlign: "left", marginTop: "0.55rem"}}>
                                <Col>
                                    <Link href="/campus_news" passHref><a className={styles.titleText}>News</a></Link>
                                </Col>
                            </div>
                        </Row>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '310px',width: '95%', margin: 'auto'}}>
                    {
                        boxContent
                    }
                </ListGroup>
            </div>
        </>
    );
}