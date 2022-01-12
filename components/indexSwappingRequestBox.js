import styles from "../styles/AnouncementBox.module.css";
import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import AnnouncementCard from "./announcementCard";

export default function IndexSwappingRequestBox(){
    const abstract = 'For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.'
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <span className={styles.titleText}>My Requests</span>
                        |
                        <span className={styles.titleText}>All Requests</span>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '300px',width: '95%', margin: 'auto'}}>
                    <ListGroupItem>
                        <AnnouncementCard abstract={abstract}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <AnnouncementCard abstract={abstract}/>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </>
    );
}