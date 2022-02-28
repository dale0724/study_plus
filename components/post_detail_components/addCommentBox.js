import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useState } from "react";
import { fetchWrapper } from "../../tools/fetchWrapper";
import { API_url } from "../../app_config";
import { useLoggedUserData } from "../../tools/helper";
import styles from "../../styles/discussionAddReply.module.css"
import { useSWRConfig } from "swr";
import RichTextEditorWithoutImg from "../helpers/richTextEditorWithoutImg";
import ReplySVG from "./replySVG";

function AddCommentBox(props) {
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


    const { mutate } = useSWRConfig()

    function handleAddClick() {
        uploadTextContent()
        clearModalInput()
    }

    function uploadTextContent() {
        const rawContent = convertToRaw(editorState.getCurrentContent())
        if (rawContent.blocks[0].text){
            fetchWrapper.post(API_url.add_discussion_post_reply,
                {
                    content: JSON.stringify(rawContent),
                    user_email: user.email,
                    discussion_post_id: props.postID
                }).then(resData => {
                console.log(resData.message)
                mutate(API_url.get_discussion_post_reply)
                alert("Your reply has been posted!")
            }).catch(error => {
                console.error(error)
            })
        }else{
            alert('You have to input something to reply!')
        }

    }

    function clearModalInput() {
        setEditorState(EditorState.createWithContent(emptyContentState))
    }

    return (
        <>
            <div>
                <div className={styles.textEditor}>
                    <RichTextEditorWithoutImg editorState={editorState} onChange={setEditorState} placeholer="Leave your comment here!"/>
                    <ReplySVG size='20' handleClick={handleAddClick}/>
                    Reply
                </div>
            </div>
        </>
    );
}


export default AddCommentBox
