import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import MyForm from "../components/helpers/myForm";
import TodoModal from "../components/todo/todoModal";

export default function Test() {
    const fields = [
        {
            name: "summary",
            lable: "Summary",
            props: {
                size: "lg",
                type: "text"
            }
        },
        {
            name: "summary",
            lable: "Summary",
            props: {
                size: "lg",
                type: "text"
            }
        }
    ]


    return (
        <Container className="text-center">
            <MyForm formID="form123" fields={fields} handleSubmit={() => alert("haha")} initialValues={{}} />
            <Button form="form123" className="mt-3" type="submit">Click Me! </Button>
        </Container>
    )
}