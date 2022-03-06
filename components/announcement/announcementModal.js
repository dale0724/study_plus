import { Modal } from "react-bootstrap";
import { useLoggedUserData } from "../../tools/helper";
import PropTypes from 'prop-types';
import RichTextEditor from "../helpers/richTextEditor";
import {convertFromRaw, EditorState} from "draft-js";

function AnnouncementModal(props) {
    const { user } = useLoggedUserData()
    var rawContent
    try {
            rawContent = JSON.parse(props.content);
        } catch(e) {
            rawContent = {
                             entityMap: {},
                             blocks: [
                                 {
                                     text: props.content,
                                     key: 'foo',
                                     type: 'unstyled',
                                     entityRanges: [],
                                 },
                             ],
                         }
        }
    const currentContent = convertFromRaw(rawContent)
    const editorState = EditorState.createWithContent(currentContent)
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RichTextEditor editorState={editorState} readOnly={true} editorKey="editor"/>
                </Modal.Body>
            </Modal>
        </>
    );
}
AnnouncementModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}
AnnouncementModal.defaultProps = {
}

export default AnnouncementModal
