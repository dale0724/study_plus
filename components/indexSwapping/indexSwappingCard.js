import React, {useState} from "react";
import Avatar from "react-avatar";
import {Row,Col} from "react-bootstrap";
import { API_url } from "../../app_config";
import styles from "../../styles/indexSwappingRequestCard.module.css";
import IndexSwappingModal from "./indexSwappingModal";
export default function IndexSwappingCard(props){
    const metaData = props.metaData
    const [showModifyModal, setShowModifyModal] = useState(false)
    function handleTextClick() {
        setShowModifyModal(true)
    }
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
                    <a className={styles.requestTitle} style={{ cursor: "pointer" }} onClick={handleTextClick}>{title}</a>
                </p>
                <div style={{ textAlign: 'left', margin: '0', fontSize: '0.75rem'}}>
                    {metaData.user_email} created at {metaData.create_time}
                </div>
            </Col>
            </Row>
            <IndexSwappingModal show={showModifyModal} handleClose={(e) => {setShowModifyModal(false)}} title={title} content={metaData.content} />
        </div>
    </>
    )
}