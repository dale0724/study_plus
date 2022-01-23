import Avatar from "react-avatar";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import Layout from "../components/layout"
import React from "react";
import {API_url} from "../app_config"
import FormData from 'form-data'
export default function Account() {
    const [show, setShow] = useState(false);
    const fileInput = React.createRef();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const formData = new FormData()
    const hanldeSubmit = (event)=>{
        event.preventDefault()
        formData.append("file",fileInput.current.files[0])
        //call api
        fetch(API_url.avatar+'/1', {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((resData) => {
                if (resData.error) {
                    alert(resData.message)
                }
                else {
                    console.log(resData)
                }
            });
    }
    return (
        <>
            <Layout>
                <div style={{ width: '1000px', border: '1px solid black', height: "400px" }} className="mt-3 mx-auto">
                    <div className="text-center">
                        <Avatar className="mt-1" name="account" src="http://localhost:5000/api/avatar/lihang0723@gmail.com" size="100" round={true} />
                        <a className="d-block" onClick={handleShow}>Change Avatar</a>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={hanldeSubmit}>
                    <Modal.Body>
                            <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Small file input example</Form.Label>
                            <Form.Control type="file" size="sm" accept="image/*" ref={fileInput}/>
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
            </Layout>
        </>
    );
}