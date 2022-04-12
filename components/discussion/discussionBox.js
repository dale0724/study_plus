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
    const recordsPerPage = 10
    let lastPage = false
    let boxContent;

    const {
        data: postMetaDataList,
        isError,
        isLoading
    } = DiscussionClient.useAllDiscussionPosts()




    function makeBoxContent(dataList, isLoading, error) {
        if (error) {
            return "Error"
        } else {
            if (!isLoading) {
                if (isLastPage(dataList)) {
                    let start = (page - 1) * recordsPerPage
                    dataList = dataList.slice(start)

                    lastPage = true
                } else {
                    let start = (page - 1) * recordsPerPage
                    let end = start + recordsPerPage
                    dataList = dataList.slice(start, end)

                    lastPage = false
                }
                return dataList.map(postMetaData =>
                    <ListGroupItem key={postMetaData.id}>
                        <DiscussionCard metaData={postMetaData} className={styles.cardBorder}/>
                    </ListGroupItem>
                )
            } else {
                return <MySpinner/>
            }
        }
    }

    function handlePageIncrease() {
        setPage(prevState => prevState + 1)
    }

    function handlePageDecrease() {
        setPage(prevState => prevState - 1)
    }

    function isLastPage(data) {
        return page * recordsPerPage >= data.length
    }

    boxContent = makeBoxContent(postMetaDataList, isLoading, isError)

    return (
        <>
            <div className={`mt-3 ${styles.border}`}>
                <Row className="m-2">
                    <Card className={`justify-content-between border-0 ${styles.titleCard}`}>
                        <div>
                            <Link href="#mostRecent" passHref><a className={styles.titleText}>Most Recent</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                        </div>
                        <div>
                            <a className={styles.titleText} style={{cursor: "pointer"}} onClick={handleShow}>New +</a>
                        </div>
                    </Card>
                </Row>
                <ListGroup style={{overflow: 'hidden auto', height: '90%', width: '95%', margin: 'auto'}}>
                    {
                        boxContent
                    }
                </ListGroup>
                <Row className="mt-2">
                    <Pagination className='justify-content-center'>
                        {page !== 1 && <Pagination.Prev onClick={handlePageDecrease}/>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        {!lastPage && <Pagination.Next onClick={handlePageIncrease}/>}
                    </Pagination>
                </Row>
            </div>
            <AddNewModal show={show} handleClose={handleClose}
                         addURL={API_url.add_discussion_post} mutateURL={API_url.get_all_discussion_posts_meta}
                         imgAllowed={true}/>
        </>
    );
}