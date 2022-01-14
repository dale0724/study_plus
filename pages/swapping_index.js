import React from "react";
import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Col, Container, Row } from "react-bootstrap"
import IndexSwappingRequestBox from "../components/indexSwappingRequestBox";
import IndexSwappingQueryBox from "../components/indexSwappingQueryBox";

export default function SwapIndex() {
    return (
        <>
            <SSRProvider>
                <Layout>
                    <Row>
                        <Col className="text-center">
                            <Container fluid className="p-0" >
                                <IndexSwappingRequestBox/>
                            </Container>
                        </Col>
                        <Col className="text-center" xxl='6' xl='6' lg='5'>
                            <IndexSwappingQueryBox/>
                        </Col>
                    </Row>
                </Layout>
            </SSRProvider>
        </>
    );
};
