import styles from "../styles/AnouncementBox.module.css";
import {Card, Row} from "react-bootstrap";
import * as React from "react";

export default class IndexSwappingQueryBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseCode: '', currentIndex:'', wantedIndex:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name=="courseCode"){
            this.setState({courseCode: event.target.value});
        }
        else if (event.target.name=="currentIndex") {
            this.setState({currentIndex: event.target.value});
        }
        else if (event.target.name=="wantedIndex") {
            this.setState({wantedIndex: event.target.value});
        }
    }

    handleSubmit(event) {
        alert('An index swapping request was submitted,  course code: ' + this.state.courseCode + ', current index: '+ this.state.currentIndex + ', wanted index: '+ this.state.wantedIndex+ '. Good Luck!');
        event.preventDefault();
    }

    render() {
        return (
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <Card border="light" className={styles.titleCard}>
                        <span className={styles.titleText}>Submit A New Query Here</span>
                    </Card>
                </Row>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Course Code:
                        <input type="text" name= "courseCode" value={this.state.courseCode} onChange={this.handleChange} />
                    </label><br/>
                    <label>
                        Current Index:
                        <input type="text" name= "currentIndex" value={this.state.currentIndex} onChange={this.handleChange} />
                    </label><br/>
                    <label>
                        Wanted Index 1:
                        <input type="text" name= "wantedIndex" value={this.state.wantedIndex} onChange={this.handleChange} />
                    </label><br/>
                    <input type="submit" value="Create a new request!" />
                </form>
            </div>
        );
    }
}