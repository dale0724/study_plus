import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from "react";
import RichTextEditor from "../helpers/richTextEditor";
import { fetchWrapper } from "../../tools/fetchWrapper";
import { API_url } from "../../app_config";
import { useLoggedUserData } from "../../tools/helper";
import FormData from 'form-data';
import { useSWRConfig } from "swr";

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
    const [titleValue, setTitleValue] = useState('')
    const [imgs, setImgs] = useState({})
    const { mutate } = useSWRConfig()

    function handleAddClick() {
        if (validateNotEmpty()){
            uploadImgs()
            uploadTextContent()
            clearModalInput()
        }else {
            alert('Title and content of a new post cannot be empty!')
        }
    }

    function validateNotEmpty(){
        const rawContent = convertToRaw(editorState.getCurrentContent())
        if (titleValue&&(JSON.stringify(rawContent.blocks[0].text)!="\"\"")){
            //console.log(JSON.stringify(rawContent.blocks[0].text))
            return true
        }else{
            return false
        }
    }

    function uploadTextContent() {
        const rawContent = convertToRaw(editorState.getCurrentContent())
        fetchWrapper.post(API_url.add_discussion_post,
            {
                title: titleValue,
                content: JSON.stringify(rawContent),
                user_email: user.email,
            }).then(resData => {
                //console.log(resData.message)
                props.handleClose()
                mutate(API_url.get_all_discussion_posts_meta)
            }).catch(error => {
                console.error(error)
            })
    }

    function uploadImgs() {
        //console.log(imgs)
        const rawContent = convertToRaw(editorState.getCurrentContent())
        const entityMap = rawContent.entityMap
        const entityUrls = []
        const entitySize = Object.keys(entityMap).length;
        for (let i = 0; i < entitySize; i++) {
            entityUrls.push(entityMap[i.toString()].data.src)
        }
        //console.log(entityUrls)
        entityUrls.forEach(url => {
            const file = imgs[url][1]
            const filename = file.name
            const fileExtension = filename.split('.').pop();
            const newFilename = Date.now() + '.' + fileExtension
            let currentContent = editorState.getCurrentContent()
            currentContent.replaceEntityData(imgs[url][0], { src: API_url.get_discussion_post_img + '/' + newFilename })
            //console.log(newFilename)

            let formData = new FormData()
            formData.append("file", file)
            //console.log(file)
            formData.append("file_name", newFilename)
            fetchWrapper.postFormData(API_url.upload_discussion_post_img, formData).catch(error => console.error(error))
        });
    }

    function clearModalInput() {
        setTitleValue.apply('')
        setEditorState(EditorState.createWithContent(emptyContentState))
    }
    function _handleClose(){
        props.handleClose()
                    clearModalInput()
    }

    return (
        <>
            <Modal show={props.show}
                onHide={_handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Key in your title" value={titleValue} onChange={(e) => { setTitleValue(e.target.value) }} required />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <RichTextEditor editorState={editorState} onChange={setEditorState} imgs={imgs} setImgs={setImgs} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={_handleClose}>
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
