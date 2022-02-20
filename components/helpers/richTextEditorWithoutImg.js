import { Editor, EditorState, RichUtils, convertToRaw, AtomicBlockUtils, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';


export default RichTextEditorWithoutImg

function RichTextEditorWithoutImg(props) {

    let editorState = props.editorState
    let setEditorState = props.onChange

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

    function toggleInlineStyle(inlineStyle) {
        props.onChange(RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
    }
    function toggleBlockType(blockType) {
        props.onChange(RichUtils.toggleBlockType(props.editorState, blockType));
    }
    const toolBar = (
        <>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => { toggleInlineStyle('BOLD') }}>B</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleInlineStyle('ITALIC')}>I</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleInlineStyle('CODE')}>{`</>`}</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleBlockType('header-one')}>H</Button>
            <Button variant="outline-secondary" size='sm' style={{ width: "40px" }} className="border-0" onClick={() => toggleBlockType('unordered-list-item')}>UL</Button>
        </>
    )
    return (
        <div>
            {
                props.readOnly ? <></> : toolBar

            }

            <div style={{ minHeight: "300px" }} >
                <Editor {...props}
                    placeholder="Enter some text..."
                    editorKey="foobaz"
                    handleKeyCommand={_handleKeyCommand} />
            </div>
        </div>
    )
}

RichTextEditorWithoutImg.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
}

RichTextEditorWithoutImg.defaultProps = {
    readOnly: false
}