import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from "react";
import RichTextEditor from "./richTextEditor";

function DiscussionAddModal(props) {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    function handleAddClick() {
        console.log(convertToRaw(editorState.getCurrentContent()))
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>    
                    <RichTextEditor editorState={editorState} onChange={setEditorState} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddClick}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default DiscussionAddModal
