import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from "react";
import RichTextEditor from "./richTextEditor";
import { fetchWrapper } from "../../tools/fetchWrapper";
import { API_url } from "../../app_config";
import { useLoggedUserData } from "../../tools/helper";


function DiscussionAddModal(props) {
    const emptyContentState = convertFromRaw({
        entityMap: {},
        blocks: [
            {
                text: '',
                key: 'foo',
                type: 'unstyled',
                entityRanges: [],
            },
        ],
    });
    const { user } = useLoggedUserData()
    const [editorState, setEditorState] = useState(EditorState.createWithContent(emptyContentState));
    function handleAddClick() {
        const rawContent = convertToRaw(editorState.getCurrentContent())
        console.log(convertToRaw(editorState.getCurrentContent()))
        fetchWrapper.post(API_url.add_discussion_post,
            {
                title: 'title',
                content: JSON.stringify(rawContent),
                user_email: user.email,
            }).then(resData =>{
                console.log(resData.message)
                props.handleClose()
            }).catch(error =>{
                console.error(error)
            })
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
