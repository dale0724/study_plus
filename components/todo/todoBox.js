import {ListGroup, ListGroupItem} from "react-bootstrap";
import styles from "../../styles/TodoBox.module.css";
import TodoCard from "./todoCard";
import {useSWRConfig} from 'swr'
import {API_url} from "../../app_config";
import MySpinner from "../../components/mySpinner";
import TodoModal from "./todoModal";
import {useState} from "react";
import {TodoBoxWrapper} from "./todoBoxWrapper";
import {TodoClient} from "../../api_client/todo/client";
import {constructUrlWithParams, useLoggedUserData} from "../../tools/helper";

export default function TodoBox(props) {
    const {user} = useLoggedUserData()
    const [showAddModal, setShowAddModal] = useState(false)
    const {mutate} = useSWRConfig()

    const url = constructUrlWithParams(API_url.todo_date, {
        user_email: user.email,
        date: props.date
    })

    let boxContent = <MySpinner/>

    function handleAddModalClose() {
        setShowAddModal(false)
        mutate(url)
    }

    function handleAddModalShow() {
        setShowAddModal(true)
    }


    const {data: todos, isLoading, isError} = TodoClient.useTodoPostsWithDate(url)
    console.debug(todos)
    // const {data: todos, isLoading, isError} = TodoClient.useTodoPosts()

    if (!isLoading) {
        if (isError) {
            boxContent = <h2>Error</h2>
        } else {
            if(todos){
                boxContent = <ListGroup style={{overflow: 'hidden auto', height: '300px', width: '95%', margin: 'auto'}}>
                    {
                        todos.map((todo) =>
                            <ListGroupItem key={todo.id} className={styles.cardBorder}>
                                <TodoCard data={todo} url={url}/>
                            </ListGroupItem>)
                    }
                </ListGroup>
            }
            else{
                boxContent = <></>
            }

        }
    }


    return (
        <>
            <TodoBoxWrapper handleAddModalShow={handleAddModalShow}>
                {boxContent}
            </TodoBoxWrapper>

            <TodoModal show={showAddModal} handleClose={handleAddModalClose}/>
        </>
    );
}