import { Modal } from "react-bootstrap";
import { API_url } from "../../app_config";
import { Button } from "react-bootstrap";
import * as yup from 'yup';
import {getTodayFirstMinuteDateTimeLocal, getTodayLastMinuteDateTimeLocal, useLoggedUserData} from "../../tools/helper";
import PropTypes from 'prop-types';
import { fetchWrapper } from "../../tools/fetchWrapper";
import MyForm from "../helpers/myForm";

function TodoModal(props) {
    const { user } = useLoggedUserData()
    const SUMMARY_MAX_LENGTH = 20
    const DETAIL_MAX_LENGTH = 200
    const validateSchema = yup.object().shape({
        summary: yup.string().max(SUMMARY_MAX_LENGTH).required('Required!'),
        detail: yup.string().max(DETAIL_MAX_LENGTH),
        start_datetime: yup.date().required('Required!'),
        end_datetime: yup.date().required('Required!').test('', 'end datetime must later than the start datetime', function (value) {
            return this.parent.start_datetime < value
        })
    });
    const formID = "todoModalForm"
    const formFields = [
        {
            name: "summary",
            label: "Summary",
            props: {
                type: "text",
                size: "lg"
            }
        },
        {
            name: "detail",
            label: "Detail",
            props: {
                as: "textarea",
                size: "lg",
                rows: 3
            }
        },
        {
            name: "start_datetime",
            label: "Start Datetime",
            props: {
                type: "datetime-local",
                size: "lg"
            }
        },
        {
            name: "end_datetime",
            label: "End Datetime",
            props: {
                type: "datetime-local",
                size: "lg"
            }
        },
    ]
    function handleSubmit(inputValues) {
        if (props.mode === "modify") {
            fetchWrapper.put(API_url.modify_todo + props.data.id,
                {
                    summary: inputValues.summary,
                    detail: inputValues.detail,
                    start_datetime: inputValues.start_datetime,
                    end_datetime: inputValues.end_datetime
                }).then(() => {
                    props.handleClose()
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            fetchWrapper.post(API_url.add_todo,
                {
                    summary: inputValues.summary,
                    detail: inputValues.detail,
                    start_datetime: inputValues.start_datetime,
                    end_datetime: inputValues.end_datetime,
                    user_email: user.email
                }).then(() => {
                    props.handleClose()
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyForm
                        fields={formFields}
                        formID={formID}
                        initialValues=
                        {
                            props.mode === 'add' ?
                                { summary: '',
                                    detail: '',
                                    start_datetime: getTodayFirstMinuteDateTimeLocal(),
                                    end_datetime: getTodayLastMinuteDateTimeLocal()
                                } :
                                {
                                    summary: props.data.summary,
                                    detail: props.data.detail,
                                    start_datetime: props.data.start_datetime,
                                    end_datetime: props.data.end_datetime
                                }
                        }
                        validateSchema={validateSchema}
                        handleSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button form={formID} variant="primary" type="submit">
                        {props.mode === 'add' ? "Add" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
TodoModal.propTypes = {
    mode: PropTypes.string,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        todo_id: PropTypes.number,
        summary: PropTypes.string,
        detail: PropTypes.string,
        finished: PropTypes.bool,
        start_datetime: PropTypes.string,
        end_datetime: PropTypes.string
    })
}
TodoModal.defaultProps = {
    mode: "add"
}

export default TodoModal
