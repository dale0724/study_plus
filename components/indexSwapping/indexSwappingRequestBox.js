import styles from "../../styles/indexSwappingRequestBox.module.css";
import {Card, ListGroup, ListGroupItem, Pagination, Row} from "react-bootstrap";
import React, {useState} from "react";
import IndexSwappingCard from "./indexSwappingCard";
import MySpinner from "../mySpinner";
import {IndexSwappingClient} from "../../api_client/index_swapping/client";
import {useLoggedUserData} from "../../tools/helper";


export default function IndexSwappingRequestBox() {
    const [displayState, SetState] = useState('all');
    const {user} = useLoggedUserData()
    const [page, setPage] = useState(1)
    const recordsPerPage = 10

    let boxContent = '';
    let lastPage = false

    function makeBoxContent(dataList, isLoading, error) {
        if (error) {
            return "Error"
        } else {
            if(!dataList){
                return ''
            }
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
                return dataList.map(post =>
                    <ListGroupItem key={post.id} className={styles.cardBorder}>
                        <IndexSwappingCard metaData={post}/>
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

    switch (displayState) {
        case 'all': {
            const {data, isLoading, isError} = IndexSwappingClient.useAllIndexSwappingPosts()
            boxContent = makeBoxContent(data, isLoading, isError)
            break
        }

        case 'my': {
            const {data, isLoading, isError} = IndexSwappingClient.useIndexSwappingPostsByEmail(user.email)
            boxContent = makeBoxContent(data, isLoading, isError)
            break
        }

        case 'matched': {
            const {data, isLoading, isError} = IndexSwappingClient.useIndexSwappingPostsMatchedByEmail(user.email)
            boxContent = makeBoxContent(data, isLoading, isError)
        }

    }


    return (
        <>
            <div className={`mt-3 ${styles.border}`}>
                <Row className="m-0">
                    <Card className={styles.titleCard}>
                        <a className={styles.titleText} style={{cursor: "pointer"}} onClick={() => {
                            SetState('all');
                            setPage(1)
                        }}>All Pending Requests</a>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <a className={styles.titleText} style={{cursor: "pointer"}} onClick={() => {
                            SetState('my');
                            setPage(1)
                        }}>My Requests</a>
                        <span className={styles.titleText}>{''}|{''}</span>
                        <a className={styles.titleText} style={{cursor: "pointer"}} onClick={() => {
                            SetState('matched');
                            setPage(1)
                        }}>Matched Request</a>
                    </Card>
                </Row>
                <ListGroup style={{overflow: 'hidden auto', height: '90%', width: '95%', margin: 'auto'}}>
                    {boxContent}
                </ListGroup>
                <Row className="mt-2">
                    <Pagination className='justify-content-center'>
                        {page !== 1 && <Pagination.Prev onClick={handlePageDecrease}/>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        {!lastPage && <Pagination.Next onClick={handlePageIncrease}/>}
                    </Pagination>
                </Row>

            </div>
        </>
    );
}