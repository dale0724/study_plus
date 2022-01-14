import Link from 'next/link';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';


export default function SignIn() {
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        //call api
        fetch('http://localhost:5000/api/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((r) => {
                return r.json();
            })
            .then((data) => {
                if (data && data.error) {
                    console.log(data.message);
                }
                if (data && data.message) {
                   console.log(data.message)
                }
            });
    }
    return (
        <Container fluid style={{ background: '#b8e5f8', height: '100vh' }}>
            <div className='mx-auto mb-3 text-center'>
                <Image style={{ width: '128px', height: '128px' }} src='https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-11-512.png' />
                <h2>StudyPlus</h2>
            </div>
            <Card border='secondary' className='mx-auto p-3' style={{ width: '400px' }}>
                <Avatar className='align-self-center shadow-sm mb-3' round={true} size='70' src='https://inews.gtimg.com/newsapp_bt/0/13392595208/1000' />
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                    <Link href='/sign_up'>
                        <a className='fs-6 d-inline-block ms-2'>Sign Up</a>
                    </Link>
                </Form>
            </Card>
        </Container>

    );
}


