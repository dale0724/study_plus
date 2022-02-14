import { Editor, EditorState, RichUtils, convertToRaw, AtomicBlockUtils, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { string } from 'yup/lib/locale';


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


export default function MediaEditor() {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(emptyContentState));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imgs, setImgs] = useState({})

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
        setImgs({ ...prevCountRef.current, ...{ [url]: [entityKey,file] } })
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

    function handlePostSubmit(e){
        let currentContent = editorState.getCurrentContent()
        console.log(convertToRaw(currentContent))
        const entityMap = convertToRaw(currentContent).entityMap
        const entityUrls = []
        for(let i=0;i<5;i++){
            if(entityMap[i.toString()]){
                entityUrls.push(entityMap[i.toString()].data.src)
            }
            else{
                break
            }
        }
        entityUrls.forEach(url => {
            currentContent.replaceEntityData(imgs[url][0],{src:"123456"})
        });
        console.log(convertToRaw(currentContent))
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

    return (
        <>
            <div style={styles.root}>
                <div style={styles.buttons}>
                    <button onClick={handleShow} style={{ marginRight: 10 }}>
                        Add Image
                    </button>
                </div>
                <div style={styles.editor}>
                    <Editor
                        editorState={editorState}
                        onChange={setEditorState}
                        blockRendererFn={mediaBlockRenderer}
                        placeholder="Enter some text..."
                        editorKey="foobaz"
                        handleKeyCommand={ _handleKeyCommand }
                    />
                </div>
                <input
                    onClick={logState}
                    style={styles.button}
                    type="button"
                    value="Log State"
                />
                <button onClick={handlePostSubmit}>
                    Post
                </button>
            </div>
            {imageAddModal}
        </>


    );
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