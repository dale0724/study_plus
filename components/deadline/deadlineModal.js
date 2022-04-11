import { Modal } from "react-bootstrap";
import { API_url } from "../../app_config";
import { Button } from "react-bootstrap";
import * as yup from 'yup';
import {getTodayFirstMinuteDateTimeLocal, getTodayLastMinuteDateTimeLocal, useLoggedUserData} from "../../tools/helper";
import PropTypes from 'prop-types';
import { fetchWrapper } from "../../tools/fetchWrapper";
import MyForm from "../helpers/myForm";

function DeadlineModal(props) {
    const { user } = useLoggedUserData()
    const SUMMARY_MAX_LENGTH = 20
    const DETAIL_MAX_LENGTH = 200
    const validateSchema = yup.object().shape({
        title: yup.string().max(SUMMARY_MAX_LENGTH).required('Required!'),
        detail: yup.string().max(DETAIL_MAX_LENGTH),
        create_time: yup.date().required('Required!'),
        end_datetime: yup.date().required('Required!').test('', 'end datetime must later than the start datetime', function (value) {
            return this.parent.create_time < value
        })
    });
    const formID = "deadlineModalForm"
    const formFields = [
        {
            name: "title",
            label: "Title",
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
            name: "create_time",
            label: "Create Datetime",
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
            fetchWrapper.put(API_url.modify_deadline + props.data.id,
                {
                    title: inputValues.title,
                    detail: inputValues.detail,
                    create_time: inputValues.create_time,
                    end_datetime: inputValues.end_datetime
                }).then(() => {
                props.handleClose()
            })
                .catch(error => {
                    console.error(error);
                });
        } else {
            fetchWrapper.post(API_url.add_new_deadline_post,
                {
                    title: inputValues.title,
                    detail: inputValues.detail,
                    create_time: inputValues.create_time,
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
                    <Modal.Title>My Deadline</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyForm
                        fields={formFields}
                        formID={formID}
                        initialValues=
                            {
                                props.mode === 'add' ?
                                    { title: '',
                                        detail: '',
                                        create_time: getTodayFirstMinuteDateTimeLocal(),
                                        end_datetime: getTodayLastMinuteDateTimeLocal()
                                    } :
                                    {
                                        title: props.data.title,
                                        detail: props.data.detail,
                                        create_time: props.data.create_time,
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
DeadlineModal.propTypes = {
    mode: PropTypes.string,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        deadline_id: PropTypes.number,
        title: PropTypes.string,
        detail: PropTypes.string,
        finished: PropTypes.bool,
        create_time: PropTypes.string,
        end_datetime: PropTypes.string
    })
}
DeadlineModal.defaultProps = {
    mode: "add"
}

export default DeadlineModal
