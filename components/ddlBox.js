import {Card, ListGroup, ListGroupItem, Row, Col} from "react-bootstrap";
import styles from "../styles/DDLBox.module.css";
import Button from 'react-bootstrap/Button';
import DeadlineCard from "./ddlCard";
import {useLoggedUserData} from "../tools/helper";
import {useState} from "react";
import useSWR, {useSWRConfig} from "swr";
import MySpinner from "./mySpinner";
import {fetchWrapper} from "../tools/fetchWrapper";
import {API_url} from "../app_config";
import DeadlineModal from "./deadline/deadlineModal";

export default function DDLBox() {
    const {user} = useLoggedUserData()
    const [showAddModal, setShowAddModal] = useState(false)
    const {mutate} = useSWRConfig()

    const url = API_url.get_deadline_post_by_email+user.email
    let boxContent = <MySpinner/>
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(API_url.get_deadline_post_by_email+user.email, fetcher)
    if (data){
        if (data['data']){
            const deadlines = data['data'].map(jsonData=>JSON.parse(jsonData))
            deadlines.sort((a, b) => a.end_datetime.localeCompare(b.end_datetime));
            console.log(deadlines)
            boxContent = deadlines.map((deadline) =>
                <ListGroupItem key={deadline.id} className={styles.cardBorder}>
                    <DeadlineCard data={deadline} url={url}/>
                </ListGroupItem>)
        }else{
            boxContent = <span style={{textAlign: 'center', margin: 'auto', color: 'grey'}}>You haven't created any deadline yet</span>
        }
    }
    // fetchWrapper.post(url, user.email).then(resData => {
    //     const deadlines = resData['data'].map(jsonData=>JSON.parse(jsonData))
    //     console.log(deadlines)
    //     boxContent = deadlines.map((deadline) =>
    //                 <ListGroupItem key={deadline.id} className={styles.cardBorder}>
    //                     <DeadlineCard data={deadline} url={url}/>
    //                 </ListGroupItem>)
    //     //console.log(boxContent)
    // }).catch(error => {
    //     boxContent = <h2>Error</h2>
    // })
    //console.log(boxContent)
    function handleAddModalClose() {
        setShowAddModal(false)
        mutate(url)
    }

    function handleAddModalShow() {
        setShowAddModal(true)
    }

    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card className={styles.titleCard}>
                    <Row>
                        <div style={{width: "70%", textAlign: "left", marginTop: "0.55rem"}}>
                            <Col>
                                <span className={styles.titleText}>Upcoming Deadlines</span>
                            </Col>
                        </div>
                            <Col style={{marginTop: "0.5rem", width: "30%"}}>
                                <Button variant="outline-dark" size="sm" className={styles.addButton} onClick={handleAddModalShow}>
                                    <div className={styles.addButtonContentContainer}>
                                        <span>New</span>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRoge3XwQnCMACF4V/x5goOYXtzDufQXXSB3ruIRyfQXlyh53ow0EsDxTT2Wd4HgSA2zQ+hEDAzm0AJNGEUM+8lSQV0YVQ5X7TOuTiwjcwnlzvkZxyixiFqHKLGIWocosYhahyiZhX5vQROpN8hDsAuzF/ALXG9FrgC97EPNPQ3O7XxHNpw7Gh1Y4tnMLi3TeTPR+CM5tG6JK7xlZr+SNQ5X7SYr5ZD1DhEjUPUOESNQ9Q4RI1D1OQOaSPzv1PwuWM/gP3MezGzJXgDqeY/+gVsPlUAAAAASUVORK5CYII="></img>
                                    </div>
                                </Button>
                            </Col>
                    </Row>
                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', height: '310px',width: '95%', margin: 'auto'}}>
                    {boxContent}
                </ListGroup>
                <DeadlineModal show={showAddModal} handleClose={handleAddModalClose}/>
            </div>
        </>
    );
}