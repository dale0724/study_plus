import React from "react";
import Layout from "../../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Col, Container, Row } from "react-bootstrap"
import DiscussionBox from "../../components/discussionBox";

export default function Discussion() {
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
                    </Row>
                </Layout>
            </SSRProvider>
        </>
    );
};
