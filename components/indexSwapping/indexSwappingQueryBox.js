import styles from "../../styles/indexSwappingQueryBox.module.css";
import { Row, Col } from "react-bootstrap";
import * as React from "react";
import Button from 'react-bootstrap/Button'
import RichTextEditor from "../helpers/richTextEditor";
import { fetchWrapper } from "../../tools/fetchWrapper";
import { API_url } from "../../app_config";

export default class IndexSwappingQueryBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseCode: '',
            currentIndex: '',
            wantedIndexList:
                [{
                    type: "text",
                    id: 0,
                    value: ""
                }],
            content: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this)
        this.clearState = this.clearState.bind(this)
    }

    clearState() {
        this.setState({
            courseCode: '',
            currentIndex: '',
            wantedIndexList:
                [{
                    type: "text",
                    id: 0,
                    value: ""
                }],
            content: ''
        })
    }

    handleChange(event) {
        if (event.target.name == "courseCode") {
            this.setState({ courseCode: event.target.value });
        }
        else if (event.target.name == "currentIndex") {
            this.setState({ currentIndex: event.target.value });
        }
        else if (event.target.name == "wantedIndex") {
            const index = event.target.id;
            const newList = this.state.wantedIndexList.slice()
            newList[index].value = event.target.value;
            this.setState({ wantedIndexList: newList });
        }
    }

    handleSubmit(event) {
        let indexList = []
        this.state.wantedIndexList.forEach(function (arrayItem) {
            indexList.push(arrayItem.value);
        });
        if (this.state.courseCode != "" & this.state.currentIndex != "" & indexList.toString() != "" & this.state.content != "") {

            fetchWrapper.get('/api/auth').
                then(resPayload => {

                    const user_email = resPayload.email
                    console.log(user_email)
                    fetchWrapper.post(API_url.add_index_swapping_post,
                        {
                            course_title: this.state.courseCode,
                            current_index: this.state.currentIndex,
                            wanted_indexes: indexList,
                            content: this.state.content,
                            user_email: user_email
                        }).
                        then(res => {
                            console.log(res.message)
                            alert('An index swapping request was submitted,  course code: ' + this.state.courseCode +
                                ', current index: ' + this.state.currentIndex +
                                ', wanted index: ' + indexList.toString() +
                                '. Good Luck!');
                            this.clearState()
                        }).
                        catch(err => {
                            console.error(err)
                            alert(`post created failed ${err}`)
                        })
                }).catch(err => console.error(err))

        }
        else {
            alert("You need to input enough information to create a request!");
        }

        event.preventDefault();
    }

    handleAdd(event) {
        event.preventDefault();
        this.setState({
            wantedIndexList: [...this.state.wantedIndexList, {
                type: "text",
                id: this.state.wantedIndexList.length,
                value: ""
            }]
        });
    }

    handleRemove(event) {
        event.preventDefault();
        if (this.state.wantedIndexList.length > 1) {
            this.setState({ wantedIndexList: [...this.state.wantedIndexList.slice(0, this.state.wantedIndexList.length - 1)] });
        }
    }

    handleContentChange(event) {
        const value = event.target.value
        this.setState({ content: value })
    }

    render() {
        return (
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                    <span className={styles.titleText}>Submit A New Query Here</span>
                </Row>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col style={{ textAlign: "right" }}>
                            <label>
                                Course Code:
                            </label>
                        </Col>
                        <Col style={{ textAlign: "left" }}>
                            <label>
                                <input type="text" name="courseCode" value={this.state.courseCode} onChange={this.handleChange} />
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "right" }}>
                            <label>
                                Current Index:
                            </label>
                        </Col>
                        <Col style={{ textAlign: "left" }}>
                            <label>
                                <input type="text" name="currentIndex" value={this.state.currentIndex} onChange={this.handleChange} />
                            </label>
                        </Col>
                    </Row>
                    {this.state.wantedIndexList.map((item, i) => {
                        return (
                            <Row key={i}>
                                <Col style={{ textAlign: "right" }}>
                                    <label>Wanted Index {i + 1}:</label>
                                </Col>
                                <Col style={{ textAlign: "left" }}>
                                    <label>
                                        <input
                                            type="text"
                                            name="wantedIndex"
                                            value={item.value}
                                            onChange={this.handleChange}
                                            id={i}
                                        />
                                    </label>
                                </Col>
                            </Row>
                        );
                    })}
                    <Row>
                        <Col style={{ textAlign: "right" }}>
                            <label>
                                Content:
                            </label>
                        </Col>
                        <Col style={{ textAlign: "left" }}>
                            <label>
                                <textarea placeholder="leave your contatct methods for others to find u!" rows="5" cols="auto" value={this.state.content} onChange={this.handleContentChange} />
                            </label>
                        </Col>
                    </Row>

                    <Button onClick={this.handleAdd} style={{ display: "inline-block", margin: "1em", background: "#7BA1C7" }}>+</Button>
                    <Button onClick={this.handleRemove} style={{ display: "inline-block", margin: "1em", background: "#7BA1C7" }}>-</Button><br />
                    <Button as="input" type="submit" value="Create a new request!" style={{ margin: "1em", background: "#7BA1C7" }} />
                </form>
            </div>
        );
    }
}