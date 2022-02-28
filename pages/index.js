import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Col, Container, Row } from "react-bootstrap"
import MyCalendar from "../components/calendar";
import TodoBox from "../components/todo/todoBox";
import AnnouncementBox from "../components/announcementBox";
import NewsBox from "../components/campus_news/newsBox";
import QuoteBox from "../components/quoteBox";
import DDLBox from "../components/ddlBox";
import useSWR from 'swr';
import Router, { useRouter } from 'next/router';
import { useLoggedUserData } from "../tools/helper";
import MySpinner from "../components/mySpinner";
import registerServiceWorkerAndSubscribeServer, {isSubscribedToServer} from "../tools/subscribe";

export default function Home() {
  const { user, isLoading, isError } = useLoggedUserData()
  if (isLoading) {
    return <MySpinner />;
  }
  if (isError) {
    Router.push('/sign_in')
  }
  console.log(isSubscribedToServer)
  if(!isSubscribedToServer & user){
    registerServiceWorkerAndSubscribeServer(user.email)
  }
  return (
    <>
      {isError ? <MySpinner /> :
        <SSRProvider>
          <Layout>
            <Row>
              <Col className="text-center">
                <Container fluid className="p-0" >
                  <MyCalendar />
                  <TodoBox />
                </Container>
              </Col>
              <Col className="text-center" xxl='6' xl='6' lg='5'>
                <AnnouncementBox />
                <NewsBox />
              </Col>
              <Col className="text-center">
                <QuoteBox />
                <DDLBox />
              </Col>
            </Row>
          </Layout>
        </SSRProvider>}
    </>
  );
};
