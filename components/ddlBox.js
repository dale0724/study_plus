import { Card,Row } from "react-bootstrap";
import styles from "../styles/DDLBox.module.css";
import Button from 'react-bootstrap/Button';

export default function DDLBox() {
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <span className={styles.titleText}>Upcoming DDL</span>
                        <Button variant="outline-dark" size="sm" className={styles.addButton}>
                            <div className={styles.addButtonContentContainer}>
                                <span>New</span>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRoge3XwQnCMACF4V/x5goOYXtzDufQXXSB3ruIRyfQXlyh53ow0EsDxTT2Wd4HgSA2zQ+hEDAzm0AJNGEUM+8lSQV0YVQ5X7TOuTiwjcwnlzvkZxyixiFqHKLGIWocosYhahyiZhX5vQROpN8hDsAuzF/ALXG9FrgC97EPNPQ3O7XxHNpw7Gh1Y4tnMLi3TeTPR+CM5tG6JK7xlZr+SNQ5X7SYr5ZD1DhEjUPUOESNQ9Q4RI1D1OQOaSPzv1PwuWM/gP3MezGzJXgDqeY/+gVsPlUAAAAASUVORK5CYII="></img>
                            </div>
                        </Button>
                    </Card>
                </Row>
                <Row className="m-0">
                    <Card border="success">
                        <Card.Body>Display Information</Card.Body>
                    </Card>
                </Row>
                <Row className="m-0">
                    <Card border="success">
                        <Card.Body>Display Information</Card.Body>
                    </Card>
                </Row>
                <Row className="m-0">
                    <Card border="success">
                        <Card.Body>Display Information</Card.Body>
                    </Card>
                </Row>
                <Row className="m-0">
                    <Card border="success">
                        <Card.Body>Display Information</Card.Body>
                    </Card>
                </Row>
                <Row className="m-0">
                    <Card border="success">
                        <Card.Body>Display Information</Card.Body>
                    </Card>
                </Row>
            </div>
        </>
    );
}