import styles from "../../styles/discussionBox.module.css";
import { Card, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import Link from "next/link";
import React from "react";
import DiscussionCard from "./discussionCard";

export default function DiscussionBox() {
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-2">
                    <Card className = {`justify-content-between border-0 ${styles.titleCard}`}>
                        <div>
                            <Link href="#mostRelevant" passHref><a className={styles.titleText}>Most Relevant</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                            <Link href="#mostRecent" passHref><a className={styles.titleText}>Most Recent</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                            <Link href="#mostVotes" passHref><a className={styles.titleText}>Most Votes</a></Link>
                        </div>
                        <div>
                            <a className={styles.addNew} style={{ cursor: "pointer" }}>New +</a>
                        </div>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', width: '95%', margin: 'auto' }}>
                    <ListGroupItem>
                        <DiscussionCard title={"[EE4717] Anyone can share with me week 3 TUT answer?"} id={"0"} />
                    </ListGroupItem>
                    <ListGroupItem>
                        <DiscussionCard title={"[EE4717] I have no clue about week 4's content. Please help!"} id={"1"} />
                    </ListGroupItem>
                </ListGroup>
            </div>
        </>
    );
}