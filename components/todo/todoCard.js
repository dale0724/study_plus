import Link from "next/link";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import useSWR, { useSWRConfig } from 'swr'
import TodoModal from "./todoModal";
import PropTypes from 'prop-types';
import { API_url } from "../../app_config";
import { useLoggedUserData } from "../../tools/helper";
function TodoCard(props) {
    const {user} = useLoggedUserData()
    const [showModifyModal, setShowModifyModal] = useState(false)
    const { mutate } = useSWRConfig()
    function handleModifyModalClose() {
        setShowModifyModal(false)
        mutate(API_url.get_todos_by_email + user.email)
    }
    function handleCheckBoxClick() {
        //call api
        fetch(API_url.update_todo_status + props.data.todo_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                finished: !props.data.finished
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.json().then((resData) => { throw new Error(resData.message) })
            })
            .then((resData) => {
                mutate(API_url.get_todos_by_email + user.email)
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
                    <Form.Check.Label style={props.data.finished? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
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
        todo_id: PropTypes.number,
        summary: PropTypes.string,
        detail: PropTypes.string,
        finished: PropTypes.bool,
        start_datetime: PropTypes.string,
        end_datetime: PropTypes.string
    }).isRequired
}


export default TodoCard