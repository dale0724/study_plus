import { Editor, EditorState, RichUtils, convertToRaw, AtomicBlockUtils, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';


export default RichTextEditor

function RichTextEditor(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imgs, setImgs] = useState({})
    let editorState = props.editorState
    let setEditorState = props.onChange
    const fileInput = React.createRef();
    const prevCountRef = useRef();
    useEffect(() => {
        prevCountRef.current = imgs;
    });


    const Image = (props) => {
        return <img src={props.src} style={styles.media} />;
    };

    const Media = (props) => {
        const entity = props.contentState.getEntity(
            props.block.getEntityAt(0)
        );
        const { src } = entity.getData();

        return <Image src={src} />
    };

    function mediaBlockRenderer(block) {
        if (block.getType() === 'atomic') {
            return {
                component: Media,
                editable: false,
            };
        }

        return null;
    }

    function logState() {
        const content = editorState.getCurrentContent();
        console.log(convertToRaw(content));
    };

    function _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    }


    function handleAddImageSubmit(e) {
        e.preventDefault();
        const file = fileInput.current.files[0]
        const url = URL.createObjectURL(file)
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'image',
            'IMMUTABLE',
            { src: url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        setImgs({ ...prevCountRef.current, ...{ [url]: [entityKey, file] } })
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );

        setEditorState(
            AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ))
    }

    const imageAddModal = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddImageSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Choose image: </Form.Label>
                        <Form.Control type="file" size="sm" accept="image/*" ref={fileInput} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose} type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
    function toggleInlineStyle(inlineStyle) {
        props.onChange(RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
    }
    function toggleBlockType(blockType) {
        props.onChange(RichUtils.toggleBlockType(props.editorState, blockType));
    }
    return (
        <div>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => { toggleInlineStyle('BOLD') }}>B</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleInlineStyle('ITALIC')}>I</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleInlineStyle('CODE')}>{`</>`}</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleBlockType('header-one')}>H</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleBlockType('unordered-list-item')}>UL</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={handleShow}>img</Button>
            <div style={{minHeight: "300px"}} >
                <Editor {...props}
                blockRendererFn={mediaBlockRenderer}
                placeholder="Enter some text..."
                editorKey="foobaz"
                handleKeyCommand={_handleKeyCommand} />
            </div>
            {imageAddModal}
        </div>
    )
}
const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    media: {
        width: '100%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial'
    },
};