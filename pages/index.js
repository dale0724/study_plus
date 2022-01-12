import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Col, Container, Row } from "react-bootstrap"
import MyCalendar from "../components/calendar";
import TodoBox from "../components/todoBox";
import AnnouncementBox from "../components/announcementBox";
import NewsBox from "../components/newsBox";
import QuoteBox from "../components/quoteBox";
import DDLBox from "../components/ddlBox";

export default function Home() {
  return (
    <>
      <SSRProvider>
        <Layout>
          <Row>
            <Col className="text-center">
              <Container fluid className="p-0" >
                <MyCalendar />
                <TodoBox/>
              </Container>
            </Col>
            <Col className="text-center" xxl='6' xl='6' lg='5'>
              <AnnouncementBox/>
              <NewsBox/>
            </Col>
            <Col className="text-center">
              <QuoteBox/>
              <DDLBox/>
            </Col>
          </Row>
        </Layout>
      </SSRProvider>
    </>
  );
};
