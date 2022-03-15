import {ListGroup, ListGroupItem, Row, Col} from "react-bootstrap";
import styles from "../../styles/TodoBox.module.css";
import TodoCard from "./todoCard";
import { useLoggedUserData } from "../../tools/helper";
import useSWR, {useSWRConfig } from 'swr'
import { API_url } from "../../app_config";
import MySpinner from "../../components/mySpinner";
import TodoModal from "./todoModal";
import { useState } from "react";
import {TodoBoxWrapper} from "./todoBoxWrapper";

export default function TodoBox() {
    const { user, isLoading } = useLoggedUserData()
    const [showAddModal, setShowAddModal] = useState(false)
    const { mutate } = useSWRConfig()

    function handleAddModalClose(){
        setShowAddModal(false)
        mutate(API_url.get_todos_by_email + user.email)
    }

    function handleAddModalShow(){
        setShowAddModal(true)
    }

    let todos = [];
    if (!isLoading) {
        const fetcher = (...args) => fetch(...args).
            then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Fetch User Todo Data Failed')
                }
            })
        const {data, error} = useSWR(API_url.get_todos_by_email + user.email, fetcher);
        if (error) {
            console.error(error)
            return (
                <TodoBoxWrapper>
                    <h2>Error</h2>
                </TodoBoxWrapper>
            )
        }
        if (!data) {
            return (
                <TodoBoxWrapper>
                    <MySpinner />
                </TodoBoxWrapper>
            )
        }
        else{
            console.debug(data)
            todos = data['data'].map(todo_json=>JSON.parse(todo_json))
            console.debug(todos)
        }
    }
    return (
        <>
            <TodoBoxWrapper handleAddModalShow={handleAddModalShow}>
                <ListGroup style={{ overflow: 'hidden auto', height: '300px', width: '95%', margin: 'auto' }}>
                    {
                        todos.map((todo) =>
                            <ListGroupItem key={todo.id} className={styles.cardBorder}>
                                <TodoCard data={todo} />
                            </ListGroupItem>)
                    }
                </ListGroup>
            </TodoBoxWrapper>

            <TodoModal show={showAddModal} handleClose={handleAddModalClose}/>
        </>
    );
}