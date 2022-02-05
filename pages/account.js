import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import Layout from "../components/layout"
import React from "react";
import { API_url } from "../app_config"
import FormData from 'form-data'
import UserAvatar from "../components/userAvatar";
import { useLoggedUserData } from "../tools/helper";
import cookie from 'js-cookie';
import Router from "next/router";
import MySpinner from "../components/mySpinner";
export default function Account() {
    const { user, isLoading, isError } = useLoggedUserData()
    const [show, setShow] = useState(false);
    const fileInput = React.createRef();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (isLoading) {
        return <MySpinner/>
    }
    const formData = new FormData()
    const hanldeSubmit = (event) => {
        event.preventDefault()
        formData.append("file", fileInput.current.files[0])
        //call api
        fetch(API_url.avatar + user.email, {
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
    const handleSignOut = (event) => {
        cookie.remove('token')
        Router.reload()
    }
    return (
        <>
            {isError ? <MySpinner /> :
             <Layout>
                <div style={{ width: '1000px', border: '1px solid black', height: "400px" }} className="mt-3 mx-auto">
                    <div className="text-center">
                        <UserAvatar size='100' round={true} />
                        <a className="d-block mx-auto" style={{ width: 'fit-content' }} onClick={handleShow}>Change Avatar</a>
                    </div>
                    <div className="text-center">
                        <p>Name: {isLoading || isError ? '' : user.name}</p>
                        <p>email:{isLoading || isError ? '' : user.email}</p>
                    </div>
                    <div className="text-center">
                        <Button variant="primary" onClick={handleSignOut}>
                            Sign Out
                        </Button>
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
            </Layout>}
        </>
    );
}