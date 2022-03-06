import React, {useState} from "react";
import Link from "next/link";
import {Row} from "react-bootstrap";
import AnnouncementModal from "./announcementModal";
import styles from "../../styles/AnnouncementCard.module.css";


export default function AnnouncementCard(props) {
    const metaData = props.metaData
    const [showModifyModal, setShowModifyModal] = useState(false)
    function handleTextClick() {
        setShowModifyModal(true)
    }
    var boxContent
    var text = ""
    try {
            const rawContent = JSON.parse(metaData.content);
            const rawBlock = rawContent.blocks[0]
            text = rawBlock.text
        } catch(e) {
            text = metaData.content
        }
    boxContent = text.length < 200 ? text : `${text.slice(0, 196)}...`
    return (
            <>
                <div>
                    <div style={{ textAlign: 'left', margin: '0', fontSize: '0.5rem'}}>
                        Created at: {metaData.create_time}
                    </div>
                    <p style={{ textAlign: 'left', margin: '0' }}>
                        <a className={styles.title} style={{ cursor: "pointer" }} onClick={handleTextClick}>{metaData.title}</a>
                    </p>
                    <p style={{ textAlign: 'left', fontSize: '0.5rem', margin: '0' }}>
                            {
                                boxContent
                            }
                    </p>
                    <Row>
                        <AnnouncementModal show={showModifyModal} handleClose={(e) => {setShowModifyModal(false)}} title={metaData.title} content={metaData.content} />
                    </Row>
                </div>
            </>
            );

}