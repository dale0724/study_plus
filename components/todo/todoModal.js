import { Modal } from "react-bootstrap";
import { API_url } from "../../app_config";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from 'yup';
import { format } from 'date-fns';

export default function TodoModal(props) {
    const SUMMARY_MAX_LENGTH = 20
    const DETAIL_MAX_LENGTH = 200
    const validateSchema = yup.object().shape({
        summary: yup.string().max(SUMMARY_MAX_LENGTH).required('Required!'),
        detail: yup.string().max(DETAIL_MAX_LENGTH),
        start_datetime: yup.date().min(new Date(), "At least start today").required('Required!'),
        end_datetime: yup.date().required('Required!').test('', 'end datetime must later than the start datetime', function (value) {
            return this.parent.start_datetime < value
        })
    });

    function handleSubmit(inputValues) {
         //call api
         fetch(API_url.modify_todo + props.todoID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                summary: inputValues.summary,
                detail: inputValues.detail,
                start_datetime: inputValues.start_datetime,
                end_datetime: inputValues.end_datetime
            }),
        })
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
                return res.json().then((resData)=>{throw new Error(resData.message)})
            })
            .then((resData) => {
                    props.handleClose()
            })
            .catch(error => {
                console.error(error);
              });
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My Todo</Modal.Title>
                </Modal.Header>
                <Formik initialValues={{ summary: '', detail: ''}}
                    validationSchema={validateSchema}
                    onSubmit={(inputValues, { setSubmitting }) => {
                        setTimeout(() => {
                            handleSubmit(inputValues)
                            setSubmitting(false);
                        }, 400);
                    }}>
                    {formik => (
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Modal.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Summary</Form.Label>
                                    <Form.Control size="lg" type="text" placeholder="Large text" isInvalid={formik.touched.summary && formik.errors.summary} {...formik.getFieldProps('summary')} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.summary}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Detail</Form.Label>
                                    <Form.Control as="textarea" rows={3} isInvalid={formik.touched.detail && formik.errors.detail} {...formik.getFieldProps('detail')} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.detail}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control size="lg" type="datetime-local" isInvalid={formik.touched.start_datetime && formik.errors.start_datetime} {...formik.getFieldProps('start_datetime')} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.start_datetime}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control size="lg" type="datetime-local" isInvalid={formik.touched.end_datetime && formik.errors.end_datetime} {...formik.getFieldProps('end_datetime')} />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.end_datetime}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={props.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )
                    }
                </Formik>

            </Modal>
        </>
    );
}