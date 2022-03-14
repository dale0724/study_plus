import { Card, ListGroup, ListGroupItem, Row, Col} from "react-bootstrap";
import styles from "../../styles/TodoBox.module.css";
import Button from 'react-bootstrap/Button';
import TodoCard from "./todoCard";
import { useLoggedUserData } from "../../tools/helper";
import useSWR, { mutate, useSWRConfig } from 'swr'
import { API_url } from "../../app_config";
import MySpinner from "../../components/mySpinner";
import TodoModal from "./todoModal";
import { useState } from "react";

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

    const Box = ({ children }) => {
        return (
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card className={styles.titleCard}>
                        <Row style={{width: "100%"}}>
                            <div style={{width: "75%", textAlign: "left"}}>
                            <Col style={{marginTop: "0.55rem"}}>
                                <span className={styles.titleText}>Today's To-Dos</span>
                            </Col>
                            </div>
                            <Col style={{marginTop: "0.5rem", width: "20%"}}>
                                <Button variant="outline-dark" size="sm" className={styles.addButton} onClick={handleAddModalShow}>
                                    <div className={styles.addButtonContentContainer}>
                                        <span>New</span>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRoge3XwQnCMACF4V/x5goOYXtzDufQXXSB3ruIRyfQXlyh53ow0EsDxTT2Wd4HgSA2zQ+hEDAzm0AJNGEUM+8lSQV0YVQ5X7TOuTiwjcwnlzvkZxyixiFqHKLGIWocosYhahyiZhX5vQROpN8hDsAuzF/ALXG9FrgC97EPNPQ3O7XxHNpw7Gh1Y4tnMLi3TeTPR+CM5tG6JK7xlZr+SNQ5X7SYr5ZD1DhEjUPUOESNQ9Q4RI1D1OQOaSPzv1PwuWM/gP3MezGzJXgDqeY/+gVsPlUAAAAASUVORK5CYII="></img>
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Row>
                {children}
            </div>
        )
    }
    var todos = []
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
                <Box>
                    <h2>Error</h2>
                </Box>
            )
        }
        if (!data) {
            return (
                <Box>
                    <MySpinner />
                </Box>
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
            <Box>
                <ListGroup style={{ overflow: 'hidden auto', height: '300px', width: '95%', margin: 'auto' }}>
                    {
                        todos.map((todo) =>
                            <ListGroupItem key={todo.id} className={styles.cardBorder}>
                                <TodoCard data={todo} />
                            </ListGroupItem>)
                    }
                </ListGroup>
            </Box>

            <TodoModal show={showAddModal} handleClose={handleAddModalClose}/>
        </>
    );
}