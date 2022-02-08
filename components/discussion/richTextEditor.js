import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from "react";
import { Button } from 'react-bootstrap';


export default RichTextEditor

function RichTextEditor(props) {
    
    function toggleInlineStyle(inlineStyle){
        props.onChange(RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
    }
    function toggleBlockType(blockType){
        props.onChange(RichUtils.toggleBlockType(props.editorState, blockType));
    }
    return (
        <div>
            <Button variant="outline-secondary" size='sm' style={{width:"40px"}} className="border-0" onClick={()=>{toggleInlineStyle('BOLD')}}>B</Button>
            <Button variant="outline-secondary" size='sm' style={{width:"40px"}} className="border-0" onClick={()=>toggleInlineStyle('ITALIC')}>I</Button>
            <Button variant="outline-secondary" size='sm' style={{width:"40px"}} className="border-0" onClick={()=>toggleInlineStyle('CODE')}>{`</>`}</Button>
            <Button variant="outline-secondary" size='sm' style={{width:"40px"}} className="border-0" onClick={()=>toggleBlockType('header-one')}>H</Button>
            <Button variant="outline-secondary" size='sm' style={{width:"40px"}} className="border-0" onClick={()=>toggleBlockType('unordered-list-item')}>UL</Button>
            <Editor {...props} />
        </div>
    )
}