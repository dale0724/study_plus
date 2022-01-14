import { Nav, Navbar, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styles from "../styles/NaviBar.module.css"

export default function NaviBar() {
  return (
    <Navbar collapseOnSelect className={styles.bluebg} expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">StudyPlus</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/swapping_index">Index Swapping</Nav.Link>
            <Nav.Link href="/discussion">Discussion Board</Nav.Link>
            <Nav.Link href="/announcement">Announcement</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#account">
              <Avatar name="account" src="http://newtownsquarevet.com/wp-content/uploads/2013/05/Maltipoo.jpg" size="50" round={true} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>);
}