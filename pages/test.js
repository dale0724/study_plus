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
import IndexSwappingDTO from "../DTO/index_swapping"
import {IndexSwappingClient} from "../api_client/index_swapping/client";

export default function Test() {
    const indexSwappingClient = new IndexSwappingClient
    const {data} = indexSwappingClient.useHello()
    // const {data, error} = IndexSwappingClient.useHello()
    // const {data, error} = useSWR("/api/hello", fetcher)
    console.log(data)

    const test_object = {
        course_title: "test_add",
        current_index: "2",
        wanted_indexes: ['1'],
        content: "Hi",
        user_email: "lihang0722@gmail.com"
    }
    const instance = IndexSwappingDTO.objectToInstance(test_object)
    console.log(instance)
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