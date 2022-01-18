
import Link from 'next/link';
import React from 'react';
import Avatar from 'react-avatar';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';
import { API_url } from '../app_config'
import Router from 'next/router';
import cookie from 'js-cookie';
import { Formik } from 'formik';
import * as yup from 'yup';
import { generateToken } from '../tools/helper';

const validateSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().required('Required!'),
});

function processSuccessfulSignIn(resData){
    cookie.set('token', generateToken(resData.email), { expires: 2 })
}


export default function SignIn() {

    function handleSubmit(inputValues) {
        //call api
        fetch(API_url.sign_in, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputValues.email,
                password: inputValues.password
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((resData) => {
                if (resData.error) {
                    alert(resData.message)
                }
                else {
                    processSuccessfulSignIn(resData)
                    Router.push('/');
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
                <Formik initialValues={{ email: '', password: '' }}
                    validationSchema={validateSchema}
                    onSubmit={(inputValues, { setSubmitting }) => {
                        setTimeout(() => {
                            handleSubmit(inputValues)
                            setSubmitting(false);
                        }, 400);
                    }}>

                    {formik => (
                        <Form noValidate  onSubmit={formik.handleSubmit} >
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" isInvalid={formik.touched.email && formik.errors.email} {...formik.getFieldProps('email')} />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" isInvalid={formik.touched.password && formik.errors.password} {...formik.getFieldProps('password')} />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                            <Link href='/sign_up'>
                                <a className='fs-6 d-inline-block ms-2'>Sign Up</a>
                            </Link>
                        </Form>)
                    }
                </Formik>
            </Card>
        </Container>

    );
}


