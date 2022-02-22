import React from "react";
import Link from "next/link";
import Avatar from "react-avatar";
import {Row,Col} from "react-bootstrap";
import { API_url } from "../../app_config";
import styles from "../../styles/discussionCard.module.css";
export default function IndexSwappingCard(props){
    const metaData = props.metaData
    var title = `[${metaData.course_title}]: ${metaData.current_index} -> `
    return(
        <>
        <div>
            <Row>
            <Col style={{flex:"0.03"}}>
                <Avatar name="account" src= { API_url.avatar +metaData.user_email  } size="50" round={true} />
            </Col>
            <Col>
                <p style={{ textAlign: 'left', margin: '0' }}>
                    <Link href={`/discussion/${encodeURIComponent(metaData.id)}`} passHref><a className={styles.discussionTitle}>{title}</a></Link>
                </p>
                <div style={{ textAlign: 'left', margin: '0', fontSize: '0.75rem'}}>
                    {metaData.user_email} created at {metaData.create_time}
                </div>
            </Col>
            </Row>
        </div>
    </>
    )
}