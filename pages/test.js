import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import DiscussionAddModal from "../components/discussion/discussionAddModal";
import MediaEditor from "../components/discussion/mediaEditor";
import MediaEditorExample from "../components/discussion/mediaEditorExample";
import MyForm from "../components/helpers/myForm";
import TodoModal from "../components/todo/todoModal";

export default function Test() {
    const [showAddModal, setShowAddModal] = useState(false)
    function handleAddModalClose(){
        setShowAddModal(false)
    }
    function handleAddModalShow(){
        setShowAddModal(true)
    }


    return (
        <Container className="text-center">
            <DiscussionAddModal show={showAddModal} handleClose={handleAddModalClose}/>
            <Button className="mt-3" onClick={handleAddModalShow }>Click Me! </Button>
            <MediaEditor></MediaEditor>
        </Container>
    )
}