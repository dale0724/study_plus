import React from "react";
import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Col, Container, Row } from "react-bootstrap"
import AnnouncementPostBox from "../components/announcementPostBox";
import AnnouncementSearchBox from "../components/announcementSearchBox";

export default function Discussion() {
    return (
        <>
            <SSRProvider>
                <Layout>
                    <Row>
                        <Col className="text-center">
                            <Container fluid className="p-0" >
                                <AnnouncementPostBox/>
                            </Container>
                        </Col>
                        <Col className="text-center" xxl='6' xl='6' lg='5' style={{flex:"0.03"}}>
                            <AnnouncementSearchBox/>
                        </Col>
                    </Row>
                </Layout>
            </SSRProvider>
        </>
    );
};