import { Formik } from "formik";
import { Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import * as yup from 'yup';
export default MyForm

 function MyForm(props) {
    console.log(props)
    return (
        <>
            <Formik initialValues={props.initialValues}
                validationSchema={props.validateSchema}
                onSubmit={(inputValues, { setSubmitting }) => {
                    setTimeout(() => {
                        props.handleSubmit(inputValues)
                        setSubmitting(false);
                    }, 400);
                }}>
                {formik => (
                    <Form id={props.formID} noValidate onSubmit={formik.handleSubmit}>
                        {
                            props.fields.map(field => {
                                return (
                                    <Form.Group className="mb-3">
                                    <Form.Label>{field.label}</Form.Label>
                                    <Form.Control {...field.props}  isInvalid={formik.touched[field.name] && formik.errors[field.name]} {...formik.getFieldProps(field.name)} />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors[field.name]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                )
                                
                            })
                        }
                    </Form>
                )
                }
            </Formik>
        </>
    )
}

MyForm.propTypes={
    formID: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    validateSchema: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape(
            {
                name: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                props: PropTypes.object
            }
        )
    ).isRequired
}

MyForm.defaultProps={
    validateSchema: yup.object().shape({ })
}
