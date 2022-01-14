import Link from 'next/link';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Container, Form, Button, Card, Image, Row, Col} from 'react-bootstrap';


export default function SignUp() {
    return (
        <Container fluid style={{ background: '#b8e5f8', height: '100vh' }}>
            <div className='mx-auto mb-3 text-center'>
                <Image style={{ width: '128px', height: '128px' }} src='https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-11-512.png' />
                <h2>StudyPlus</h2>
            </div>
            <Card border='secondary' className='mx-auto p-3' style={{ width: '400px' }}>
                <Avatar className='align-self-center shadow-sm mb-3' round={true} size='70' src='https://inews.gtimg.com/newsapp_bt/0/13392595208/1000' />
                <Form>
                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option value='student'>Student</option>
                            <option value="teacher">Teacher</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
    
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                    <Link href='/sign_in'>
                        <a className='fs-6 d-inline-block ms-2'>Sign in</a>
                    </Link>
                </Form>
            </Card>

        </Container>
    );
}