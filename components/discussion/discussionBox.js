import styles from "../../styles/discussionBox.module.css";
import {Card, ListGroup, ListGroupItem, Pagination, Row} from "react-bootstrap";
import Link from "next/link";
import React, {useState} from "react";
import DiscussionCard from "./discussionCard";
import AddNewModal from "../add_new_modal/addNewModal";
import {API_url} from "../../app_config";
import MySpinner from "../mySpinner";
import DiscussionClient from "../../api_client/discussion/client";

export default function DiscussionBox() {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const quantityPerPage = 10
    let isLastPage = false

    const {
        data: postMetaDataList,
        error
    } = DiscussionClient.use_posts_with_offset_and_quantity_limit((page - 1) * quantityPerPage, quantityPerPage)

    let boxContent;

    if (error) {
        boxContent = "Error"
    } else {
        if (postMetaDataList) {
            isLastPage = postMetaDataList.length < quantityPerPage;

            boxContent = postMetaDataList.map(postMetaData =>
                <ListGroupItem key={postMetaData.id}>
                    <DiscussionCard metaData={postMetaData}/>
                </ListGroupItem>)
        } else {
            boxContent = <MySpinner/>
        }
    }

    function handlePageIncrease() {
        setPage(prevState => prevState + 1)
    }

    function handlePageDecrease() {
        setPage(prevState => prevState - 1)
    }

    return (
        <>
            <div className={`mt-3 ${styles.border}`}>
                <Row className="m-2">
                    <Card className={`justify-content-between border-0 ${styles.titleCard}`}>
                        <div>
                            <Link href="#mostRelevant" passHref><a className={styles.titleText}>Most Relevant</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                            <Link href="#mostRecent" passHref><a className={styles.titleText}>Most Recent</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                            <Link href="#mostVotes" passHref><a className={styles.titleText}>Most Votes</a></Link>
                        </div>
                        <div>
                            <a className={styles.titleText} style={{cursor: "pointer"}} onClick={handleShow}>New +</a>
                        </div>
                    </Card>
                </Row>
                <ListGroup style={{overflow: 'hidden auto', height: '600px', width: '95%', margin: 'auto'}}>
                    {
                        boxContent
                    }
                </ListGroup>
                <Row className="mt-2">
                    <Pagination className='justify-content-center'>
                        {page !== 1 && <Pagination.Prev onClick={handlePageDecrease}/>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        {!isLastPage && <Pagination.Next onClick={handlePageIncrease}/>}
                    </Pagination>
                </Row>
                <AddNewModal show={show} handleClose={handleClose}
                             addURL={API_url.add_discussion_post} mutateURL={API_url.get_all_discussion_posts_meta}
                             imgAllowed={true}/>
            </div>
        </>
    );
}