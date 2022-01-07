import { Card,Row } from "react-bootstrap";
import styles from "../styles/AnouncementBox.module.css";
import { ListGroup,ListGroupItem } from "react-bootstrap";
import AnouncementCard from "./anouncementCard";


export default function AnouncementBox(){
    const abstract = 'For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.'
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <span className={styles.titleText}>Anouncements</span>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '300px',width: '95%', margin: 'auto'}}>
                    <ListGroupItem>
                       <AnouncementCard abstract={abstract}/>
                    </ListGroupItem>
                    <ListGroupItem>
                       <AnouncementCard abstract={abstract}/>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </>
    );
}