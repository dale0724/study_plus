import React from "react";
import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Col, Container, Row } from "react-bootstrap"
import NewsMap from "../components/newsMap";

export default function Discussion() {
    return (
        <>
            <SSRProvider>
                <Layout>
                    <Row>
                        <Col className="text-center">
                            <Container fluid className="p-0" >
                                <NewsMap/>
                            </Container>
                        </Col>
                    </Row>
                </Layout>
            </SSRProvider>
        </>
    );
};
