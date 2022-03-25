import { Card} from "react-bootstrap";
import styles from "../styles/QuoteBox.module.css";

export default function QuoteBox() {
    return (
        <>
            <Card className={styles.border} style={{minHeight: '200px', marginTop:'1rem', alignItems:'center'}}>
                <Card.Body className={styles.content}>
                    <span>Live life to the fullest and focus on the positive.</span>
                </Card.Body>
            </Card>
        </>
    );
}