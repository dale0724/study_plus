import React from "react";
import styles from "../../styles/discussionCard.module.css";
import Link from "next/link";
import Avatar from "react-avatar";
import {Row,Col} from "react-bootstrap";

export default class DiscussionCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div>
                    <Row>
                    <Col style={{flex:"0.03"}}>
                        <Avatar name="account" src="http://newtownsquarevet.com/wp-content/uploads/2013/05/Maltipoo.jpg" size="50" round={true} />
                    </Col>
                    <Col>
                        <p style={{ textAlign: 'left', margin: '0' }}>
                            <Link href={"/discussion/"+this.props.id} passHref><a className={styles.discussionTitle}>{this.props.title}</a></Link>
                        </p>
                        <div style={{ textAlign: 'left', margin: '0', fontSize: '0.75rem'}}>
                            Dale created at {Date().toString()}
                        </div>
                    </Col>
                    </Row>
                </div>
            </>
        );
    }
}