import styles from "../../styles/AnnouncementPostBox.module.css";
import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Link from "next/link";
import React from "react";
import { fetchWrapper } from "../../tools/fetchWrapper";
import {useState} from "react";
import useSWR from "swr";
import MySpinner from "../mySpinner";
import AnnouncementCard from "./announcementCard";
import AddNewModal from "../add_new_modal/addNewModal";
import { API_url } from "../../app_config";
import {useLoggedUserData} from "../../tools/helper";

export default function AnnouncementPostBox(){
    const {user} = useLoggedUserData()
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(user?user.userType==="teacher":false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR('http://localhost:3000/api/announcement/all_posts', fetcher)
    var boxContent
    if(error){
        boxContent = "Error"
    }
    else{
         if (data) {
        const postMetaDataList = data['data'].map(jsonData=>JSON.parse(jsonData))
        boxContent = postMetaDataList.map(postMetaData =>
            <ListGroupItem key={postMetaData.id} className={styles.cardBorder}>
                <AnnouncementCard metaData={postMetaData} />
            </ListGroupItem>)
            //console.log(boxContent)
        }
        else{
            boxContent = <MySpinner></MySpinner>
        }
    }

    return (
        <>
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={`justify-content-between border-0 ${styles.titleCard}`}>
                        <div>
                            <Link href="#mostRelevant" passHref><a className={styles.titleText}>Most Recent</a></Link>
                            <span className={styles.titleText}>{''}|{''}</span>
                            <Link href="#mostRecent" passHref><a className={styles.titleText}>Most Urgent</a></Link>
                        </div>
                        {
                            showAdd&&
                            <div>
                                <a className={styles.titleText} style={{ cursor: "pointer" }} onClick={handleShow}>New +</a>
                            </div>
                        }

                    </Card>
                </Row>
                <ListGroup style={{ overflow: 'hidden auto', width: '95%', margin: 'auto'}}>
                    {boxContent}
                </ListGroup>
                <AddNewModal show={show} handleClose={handleClose}
                 addURL={'http://localhost:3000/api/announcement/add_new'} mutateURL={'http://localhost:3000/api/announcement/all_posts'}
                 imgAllowed={false}/>
            </div>
        </>
    );
}