import { Modal } from "react-bootstrap";
import { useLoggedUserData } from "../../tools/helper";
import PropTypes from 'prop-types';
function IndexSwappingModal(props) {
    const { user } = useLoggedUserData()
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.content}
                </Modal.Body>
            </Modal>
        </>
    );
}
IndexSwappingModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}
IndexSwappingModal.defaultProps = {
}

export default IndexSwappingModal
