import styles from "../../styles/post_id.module.css";
import {Col, Row} from "react-bootstrap";
import React from "react";

export default function CommentHeader(props) {
    return(
        <div className={styles.commentHeader}>
            <Row>
                <div style={{width: '50px', display: "inline-block", marginLeft: '10px'}}>
                    <Col>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.77735 20.4818L3.36132 19.8577L3.77735 20.4818ZM21.75 16.5V4.5H20.25V16.5H21.75ZM9.15139 17.75H20.5V16.25H9.15139V17.75ZM4.19338 21.1058L9.29006 17.708L8.45801 16.4599L3.36132 19.8577L4.19338 21.1058ZM2.25 17V20.0657H3.75V17H2.25ZM2.25 14V17H3.75V14H2.25ZM2.25 4.5V14H3.75V4.5H2.25ZM20.5 3.25H3.5V4.75H20.5V3.25ZM3.36132 19.8577C3.52746 19.747 3.75 19.8661 3.75 20.0657H2.25C2.25 21.0641 3.36268 21.6596 4.19338 21.1058L3.36132 19.8577ZM9.15139 16.25C8.90461 16.25 8.66335 16.323 8.45801 16.4599L9.29006 17.708C9.249 17.7354 9.20074 17.75 9.15139 17.75V16.25ZM3.75 4.5C3.75 4.63807 3.63807 4.75 3.5 4.75V3.25C2.80964 3.25 2.25 3.80964 2.25 4.5H3.75ZM21.75 4.5C21.75 3.80965 21.1904 3.25 20.5 3.25V4.75C20.3619 4.75 20.25 4.63807 20.25 4.5H21.75ZM20.25 16.5C20.25 16.3619 20.3619 16.25 20.5 16.25V17.75C21.1904 17.75 21.75 17.1904 21.75 16.5H20.25Z"
                                fill="black"/>
                        </svg>
                    </Col>
                </div>
                <Col style={{paddingLeft: '0'}}><h6 style={{marginTop: "3px"}}>Comments: {props.commentLength}</h6></Col>
            </Row>
        </div>
    )
}