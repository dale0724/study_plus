import { Nav, Navbar, Container } from 'react-bootstrap';
import styles from "../styles/NaviBar.module.css"
import Link from "next/link";
import React from "react";
import UserAvatar from './userAvatar';

export default function NaviBar() {
  return (
    <Navbar collapseOnSelect className={styles.bluebg} expand="lg" variant="dark">
      <Container fluid>
        <Link href="/" passHref><Navbar.Brand>StudyPlus</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/swapping_index" passHref><Nav.Link>Index Swapping</Nav.Link></Link>
            <Link href="/discussion" passHref><Nav.Link>Discussion Board</Nav.Link></Link>
            <Link href="/announcement" passHref><Nav.Link>Announcement</Nav.Link></Link>
            <Link href="/news" passHref><Nav.Link>Campus News</Nav.Link></Link>
          </Nav>
          <Nav>
            <Nav.Link href="/account">
              <UserAvatar size='50' round={true}/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>);
}