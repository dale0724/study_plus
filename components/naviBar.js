import { Nav,Navbar,Container,NavDropdown } from 'react-bootstrap';
import styles from "../styles/NaviBar.module.css"

export default function NaviBar(){
    return (
    <Navbar collapseOnSelect className={styles.bluebg}  expand="lg" variant="dark">
    <Container>
    <Navbar.Brand href="#home">StudyPlus</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#index">Index Swapping</Nav.Link>
        <Nav.Link href="#discussion">Discussion Board</Nav.Link>
        <Nav.Link href="#anouncement">Anouncement</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>);
}