import React from "react";
import {Col, Row} from "react-bootstrap";
import Avatar from "react-avatar";
import {API_url} from "../../app_config";
import Link from "next/link";
import styles from "../../styles/discussionCard.module.css";

export default function NewsCard(props) {
    const metaData = props.metaData
    return (
        <>
            <div>
                <Row>
                    <Col>
                        <p style={{textAlign: 'left', margin: '0'}}>
                            <Link href={`/campus_news/${encodeURIComponent(metaData.id)}`} passHref><a
                                className={styles.discussionTitle}>{metaData.title}</a></Link>
                        </p>
                        <div style={{textAlign: 'left', margin: '0', fontSize: '0.75rem'}}>
                            {metaData.user_email} created at {metaData.create_time}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}