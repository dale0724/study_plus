import React from "react";
import styles from "../../styles/discussionCard.module.css";
import Link from "next/link";
import Avatar from "react-avatar";
import {Row,Col} from "react-bootstrap";
import { API_url } from "../../app_config";
export default function DiscussionCard(props){
    const metaData = props.metaData
    return(
        <>
        <div>
            <Row>
            <Col style={{flex:"0.03"}}>
                <Avatar name="account" src= { API_url.avatar +metaData.user_email  } size="50" round={true} />
            </Col>
            <Col>
                <p style={{ textAlign: 'left', margin: '0' }}>
                    <Link href={"/discussion/"+ metaData.id} passHref><a className={styles.discussionTitle}>{metaData.title}</a></Link>
                </p>
                <div style={{ textAlign: 'left', margin: '0', fontSize: '0.75rem'}}>
                    Dale created at {metaData.create_time}
                </div>
            </Col>
            </Row>
        </div>
    </>
    )
}