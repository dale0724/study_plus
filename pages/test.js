import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import TodoModal from "../components/todo/todoModal";

export default function Test(){
    const [show, setShow] = useState(false)
    function handleClose(){
        setShow(false)
        console
    }
    function handleShow(){
        setShow(true)
        console.log(show)
    }

    return (
        <Container className="text-center">
            <Button className="mt-3" onClick={handleShow}>Click Me! </Button>
            <TodoModal show={show} handleClose={handleClose} todoID='6' />
        </Container>
    )
}