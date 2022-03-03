import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useState } from "react";
import { fetchWrapper } from "../../tools/fetchWrapper";
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
        var toPost = {}
        /*remove following check when dto is created*/
        if (props.type=='discussion'){
            toPost = {
            content: JSON.stringify(rawContent),
            user_email: user.email,
            discussion_post_id: props.postID
            }
        }else if (props.type=='campus_news'){
            toPost = {
            content: JSON.stringify(rawContent),
            user_email: user.email,
            campus_news_id: props.postID
            }
        }
        if (rawContent.blocks[0].text){
            fetchWrapper.post(props.apiAddReplyUrl,
                toPost).then(resData => {
                console.log(resData.message)
                mutate(props.apiMutateUrl)
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
