import styles from "../styles/AnouncementBox.module.css";
import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";

export default function IndexSwappingQueryBox(){
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <span className={styles.titleText}>Submit A New Query Here</span>
                    </Card>
                </Row>
                
            </div>
        </>
    );
}