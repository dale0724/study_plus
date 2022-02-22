import { Nav, Navbar, Container, Badge } from 'react-bootstrap';
import styles from "../styles/NaviBar.module.css"
import Link from "next/link";
import React from "react";
import UserAvatar from './userAvatar';
import useSWR from 'swr';
import { API_url } from '../app_config';
import { useLoggedUserData } from '../tools/helper';

export default function NaviBar() {
  var unread_records_number = 0
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const {data: user} = useSWR('/api/auth', fetcher);
  const { data} = useSWR(() => API_url.get_unread_index_matched_number + user.email, fetcher)
  unread_records_number = data ? data['data'] : 0
  console.log(unread_records_number)

  return (
    <>
      <Navbar collapseOnSelect className={styles.bluebg} expand="lg" variant="dark">
      <Container fluid>
        <Link href="/" passHref><Navbar.Brand>StudyPlus</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/swapping_index" passHref><Nav.Link>Index Swapping {unread_records_number ? <Badge>{unread_records_number}</Badge> : ''}</Nav.Link></Link>
            <Link href="/discussion" passHref><Nav.Link>Discussion Board</Nav.Link></Link>
            <Link href="/announcement" passHref><Nav.Link>Announcement</Nav.Link></Link>
            <Link href="/news" passHref><Nav.Link>Campus News</Nav.Link></Link>
          </Nav>
          <Nav>
            <Nav.Link href="/account">
              <UserAvatar size='50' round={true} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>

  );
}