import styles from "../../styles/TodoBox.module.css";
import {Card, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export function TodoBoxWrapper(props){
    const children = props.children
    return (
        <div className={`mt-3 ${styles.border}`} style={{minHeight: '400px'}}>
            <Row className="m-0">
                <Card className={styles.titleCard}>
                    <Row style={{width: "100%"}}>
                        <div style={{width: "75%", textAlign: "left"}}>
                            <Col style={{marginTop: "0.55rem"}}>
                                <span className={styles.titleText}>Today's To-Dos</span>
                            </Col>
                        </div>
                        <Col style={{marginTop: "0.5rem", width: "20%"}}>
                            <Button variant="outline-dark" size="sm" className={styles.addButton} onClick={props.handleAddModalShow}>
                                <div className={styles.addButtonContentContainer}>
                                    <span>New</span>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRoge3XwQnCMACF4V/x5goOYXtzDufQXXSB3ruIRyfQXlyh53ow0EsDxTT2Wd4HgSA2zQ+hEDAzm0AJNGEUM+8lSQV0YVQ5X7TOuTiwjcwnlzvkZxyixiFqHKLGIWocosYhahyiZhX5vQROpN8hDsAuzF/ALXG9FrgC97EPNPQ3O7XxHNpw7Gh1Y4tnMLi3TeTPR+CM5tG6JK7xlZr+SNQ5X7SYr5ZD1DhEjUPUOESNQ9Q4RI1D1OQOaSPzv1PwuWM/gP3MezGzJXgDqeY/+gVsPlUAAAAASUVORK5CYII="/>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Row>
            {children}
        </div>
    )
}