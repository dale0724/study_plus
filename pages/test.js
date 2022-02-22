import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import DiscussionAddModal from "../components/discussion/discussionAddModal";
import MediaEditor from "../components/discussion/mediaEditor";
import MediaEditorExample from "../components/discussion/mediaEditorExample";
import MyForm from "../components/helpers/myForm";
import RichTextEditorWithoutImg from "../components/helpers/richTextEditorWithoutImg";
import TodoModal from "../components/todo/todoModal";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

export default function Test() {
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
    const [editorState, setEditorState] = useState(EditorState.createWithContent(emptyContentState));
    return (
        <Container className="text-center">
             <RichTextEditorWithoutImg editorState={editorState} onChange={setEditorState}></RichTextEditorWithoutImg>
             <Button onClick={()=>console.log(convertToRaw(editorState.getCurrentContent()))}>Click!</Button>
        </Container>
    )
}