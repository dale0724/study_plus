import styles from "../../styles/AnnouncementPostBox.module.css";
import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Link from "next/link";
import React from "react";
import AnnouncementPostCard from "./announcementPostCard";

export default function AnnouncementPostBox(){
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <Link href="#mostRelevant" passHref><a className={styles.titleText}>Most Relevant</a></Link>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <Link href="#mostRecent" passHref><a className={styles.titleText}>Most Recent</a></Link>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', width: '95%', margin: 'auto'}}>
                    <ListGroupItem>
                        <AnnouncementPostCard title={"[EE4717] Quiz 1 Announcement"} id={"0"}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <AnnouncementPostCard title={"[EE4717] Quiz 2 Announcement"} id={"1"}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <AnnouncementPostCard title={"[EE4414] Quiz 1 is coming!"} id={"1"}/>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </>
    );
}