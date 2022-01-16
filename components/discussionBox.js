import styles from "../styles/discussionBox.module.css";
import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Link from "next/link";
import React from "react";
import DiscussionCard from "./discussionCard";

export default function DiscussionBox(){
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <Link href="#mostRelevant" passHref><a className={styles.titleText}>Most Relevant</a></Link>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <Link href="#mostRecent" passHref><a className={styles.titleText}>Most Recent</a></Link>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <Link href="#mostVotes" passHref><a className={styles.titleText}>Most Votes</a></Link>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', width: '95%', margin: 'auto'}}>
                    <ListGroupItem>
                        <DiscussionCard title={"[EE4717] Anyone can share with me week 3 TUT answer?"} id={"0"}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <DiscussionCard title={"[EE4717] I have no clue about week 4's content. Please help!"} id={"1"}/>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </>
    );
}