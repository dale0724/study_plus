
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import  { useSWRConfig } from 'swr'
import TodoModal from "./todoModal";
import PropTypes from 'prop-types';
import { API_url } from "../../app_config";
import { fetchWrapper } from "../../tools/fetchWrapper";
function TodoCard(props) {
    const [showModifyModal, setShowModifyModal] = useState(false)
    const { mutate } = useSWRConfig()
    function handleModifyModalClose() {
        setShowModifyModal(false)
        mutate(props.url)
    }
    function handleCheckBoxClick() {
        console.debug(props.data.id)
        fetchWrapper.put(API_url.update_todo_status + props.data.id,
            {
                finished: !props.data.finished
            }).then(() => {
                mutate(props.url)
            })
            .catch(error => {
                console.error(error);
            });

    }
    function handleTextClick() {
        setShowModifyModal(true)
    }
    return (
        <>
            <Form>
                <Form.Check type="checkbox">
                    <Form.Check.Input type="checkbox" onChange={handleCheckBoxClick} checked={props.data.finished} />
                    <Form.Check.Label style={props.data.finished ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
                        <a style={{ cursor: "pointer" }} onClick={handleTextClick}>{props.data.summary}</a>
                    </Form.Check.Label>
                </Form.Check>
            </Form>
            <TodoModal show={showModifyModal} handleClose={handleModifyModalClose} mode="modify" data={props.data} />
        </>
    );
}

TodoCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        summary: PropTypes.string,
        detail: PropTypes.string,
        finished: PropTypes.bool,
        start_datetime: PropTypes.string,
        end_datetime: PropTypes.string
    }).isRequired
}


export default TodoCard