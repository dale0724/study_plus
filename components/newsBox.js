import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import styles from "../styles/NewsBox.module.css";
import Button from 'react-bootstrap/Button';
import NewsCard from "./newsCard";
import Link from "next/link";
import React from "react";

export default function NewsBox() {
    const abstract = 'For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.'
    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <Link href="/news" passHref><a className={styles.titleText}>News</a></Link>
                        <Button variant="outline-dark" size="sm" className={styles.addButton}>
                            <div className={styles.addButtonContentContainer}>
                                <span>New</span>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRoge3XwQnCMACF4V/x5goOYXtzDufQXXSB3ruIRyfQXlyh53ow0EsDxTT2Wd4HgSA2zQ+hEDAzm0AJNGEUM+8lSQV0YVQ5X7TOuTiwjcwnlzvkZxyixiFqHKLGIWocosYhahyiZhX5vQROpN8hDsAuzF/ALXG9FrgC97EPNPQ3O7XxHNpw7Gh1Y4tnMLi3TeTPR+CM5tG6JK7xlZr+SNQ5X7SYr5ZD1DhEjUPUOESNQ9Q4RI1D1OQOaSPzv1PwuWM/gP3MezGzJXgDqeY/+gVsPlUAAAAASUVORK5CYII="></img>
                            </div>
                        </Button>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '310px',width: '95%', margin: 'auto'}}>
                    <ListGroupItem>
                        <NewsCard abstract={abstract}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NewsCard abstract={abstract}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NewsCard abstract={abstract}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NewsCard abstract={abstract}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NewsCard abstract={abstract}/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NewsCard abstract={abstract}/>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </>
    );
}