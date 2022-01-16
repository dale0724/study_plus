import styles from "../styles/indexSwappingRequestBox.module.css";
import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import IndexSwappingRequestCard from "./indexSwappingRequestCard";
import Link from "next/link";
import React from "react";

export default function IndexSwappingRequestBox(){
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <Link href="#myRequests" passHref><a className={styles.titleText}>My Requests</a></Link>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <Link href="#allRequests" passHref><a className={styles.titleText}>All Pending Requests</a></Link>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '300px',width: '95%', margin: 'auto'}}>
                    <ListGroupItem>
                        <IndexSwappingRequestCard title={"EE4717 | 30277 -> 30278"} id={"0"}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <IndexSwappingRequestCard title={"EE4717 | 30277 -> 30278"} id={"1"}/>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </>
    );
}