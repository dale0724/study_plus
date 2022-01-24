import { Container, Spinner } from "react-bootstrap";

export default function MySpinner(){
    return (
        <Container className="d-flex justify-content-center align-content-center"  >
            <Spinner animation="grow" />
        </Container>

    )
}