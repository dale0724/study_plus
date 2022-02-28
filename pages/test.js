import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import DiscussionAddModal from "../components/discussion/discussionAddModal";
import MediaEditor from "../components/discussion/mediaEditor";
import MediaEditorExample from "../components/discussion/mediaEditorExample";
import MyForm from "../components/helpers/myForm";
import RichTextEditorWithoutImg from "../components/helpers/richTextEditorWithoutImg";
import TodoModal from "../components/todo/todoModal";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { fetcher, fetchWrapper } from "../tools/fetchWrapper";
import useSWR from "swr";

export default function Test() {
    
    const {data, error} = useSWR("/api/hello", fetcher)
    console.log(data)
    if(error){
        console.log(error)
    }
    return (
        <Container className="text-center">
                <h1>
                    {
                        data?data.message:'No data'
                    }
                </h1>
        </Container>
    )
}