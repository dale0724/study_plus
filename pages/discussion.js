import React from "react";
import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Col, Container, Row } from "react-bootstrap"
import DiscussionBox from "../components/discussion/discussionBox"
import DiscussionSearchBox from "../components/discussion/discussionSearchBox";
import { useLoggedUserData } from "../tools/helper";
import UserAvatar from "../components/userAvatar";
import MySpinner from "../components/mySpinner";

export default function Discussion() {
    const {isLoading} = useLoggedUserData()
    if(isLoading){
        return <MySpinner/>
    }
    return (
        <>
            <SSRProvider>
                <Layout>
                    <Row>
                        <Col className="text-center">
                            <Container fluid className="p-0" >
                                <DiscussionBox/>
                            </Container>
                        </Col>
                        <Col className="text-center" xxl='6' xl='6' lg='5' style={{flex:"0.03"}}>
                            <DiscussionSearchBox/>
                        </Col>
                    </Row>
                </Layout>
            </SSRProvider>
        </>
    );
};
