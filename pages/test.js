import {Button, Container} from "react-bootstrap";
import DiscussionBox from "../components/discussion/discussionBox";
import {getCurrentDateTimeLocal} from "../tools/helper";

export default function Test() {
    return (
        <Container className="text-center">
            <DiscussionBox/>
            <Button onClick={()=>console.log(getCurrentDateTimeLocal())}></Button>
        </Container>
    )
}