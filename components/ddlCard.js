import React, { useState } from "react";
import  { useSWRConfig } from 'swr'
import DeadlineModal from "./deadline/deadlineModal";
import PropTypes from 'prop-types';
import { API_url } from "../app_config";
import { fetchWrapper } from "../tools/fetchWrapper";
import {Row, Col} from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";

function DeadlineCard(props) {
    const [showModifyModal, setShowModifyModal] = useState(false)
    const { mutate } = useSWRConfig()
    function handleModifyModalClose() {
        setShowModifyModal(false)
        mutate(props.url)
    }
    function handleTextClick() {
        setShowModifyModal(true)
    }
    return (
        <>
            <div>
                <Row style={{ color: (() => {
                        if ((Date.parse(props.data.end_datetime) - Date.now())/1000/60/60<=24) {
                            return "red";
                        } else {
                            return "black";
                        }
                    })()
                }}>
                    <Col><a style={{ cursor: "pointer" }} onClick={handleTextClick}>{props.data.title}</a></Col>
                    <Col>due <ReactTimeAgo future date={props.data.end_datetime} timeStyle="mini-minute"/></Col>
                </Row>
            </div>
            <DeadlineModal show={showModifyModal} handleClose={handleModifyModalClose} mode="modify" data={props.data} />
        </>
    );
}

DeadlineCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        detail: PropTypes.string,
        create_time: PropTypes.string,
        end_datetime: PropTypes.string
    }).isRequired
}


export default DeadlineCard