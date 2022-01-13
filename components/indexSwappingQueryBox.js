import styles from "../styles/indexSwappingQueryBox.module.css";
import {Row, Col} from "react-bootstrap";
import * as React from "react";
import Button from 'react-bootstrap/Button'

export default class IndexSwappingQueryBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseCode: '', currentIndex:'', wantedIndexList:[{
                type: "text",
                id: 0,
                value: ""
            }]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleChange(event) {
        if (event.target.name=="courseCode"){
            this.setState({courseCode: event.target.value});
        }
        else if (event.target.name=="currentIndex") {
            this.setState({currentIndex: event.target.value});
        }
        else if (event.target.name=="wantedIndex") {
            const index = event.target.id;
            const newList = this.state.wantedIndexList.slice()
            newList[index].value = event.target.value;
            this.setState({wantedIndexList: newList});
        }
    }

    handleSubmit(event) {
        let indexList = []
        this.state.wantedIndexList.forEach(function (arrayItem) {
            indexList.push(arrayItem.value);
        });
        if (this.state.courseCode!=""&this.state.currentIndex!=""&indexList.toString()!=""){
            alert('An index swapping request was submitted,  course code: ' + this.state.courseCode + ', current index: '+ this.state.currentIndex + ', wanted index: '+ indexList.toString() + '. Good Luck!');
        }
        else {
            alert("You need to input enough information to create a request!");
        }
        event.preventDefault();
    }

    handleAdd(event) {
        event.preventDefault();
        this.setState({wantedIndexList: [...this.state.wantedIndexList, {
            type: "text",
            id: this.state.wantedIndexList.length,
            value: ""
        }]});
    }

    handleRemove(event) {
        event.preventDefault();
        if (this.state.wantedIndexList.length >1){
            this.setState({wantedIndexList: [...this.state.wantedIndexList.slice(0, this.state.wantedIndexList.length-1)]});
        }
    }

    render() {
        return (
            <div className={`mt-3 ${styles.border}`} >
                <Row className="m-0">
                        <span className={styles.titleText}>Submit A New Query Here</span>
                </Row>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col style={{textAlign:"right"}}>
                            <label>
                            Course Code:
                            </label>
                        </Col>
                        <Col style={{textAlign:"left"}}>
                            <label>
                                <input type="text" name= "courseCode" value={this.state.courseCode} onChange={this.handleChange} />
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign:"right"}}>
                            <label>
                                Current Index:
                            </label>
                        </Col>
                        <Col style={{textAlign:"left"}}>
                            <label>
                                <input type="text" name= "currentIndex" value={this.state.currentIndex} onChange={this.handleChange} />
                            </label>
                        </Col>
                    </Row>
                    {this.state.wantedIndexList.map((item, i) => {
                        return (
                            <Row>
                                <Col style={{textAlign:"right"}}>
                                    <label>Wanted Index {i+1}:</label>
                                </Col>
                                <Col style={{textAlign:"left"}}>
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
                    <Button onClick={this.handleAdd} style={{display:"inline-block", margin:"1em", background:"#7BA1C7"}}>+</Button>
                    <Button onClick={this.handleRemove} style={{display:"inline-block", margin:"1em", background:"#7BA1C7"}}>-</Button><br/>
                    <Button as="input" type="submit" value="Create a new request!" style={{margin:"1em", background:"#7BA1C7"}}/>
                </form>
            </div>
        );
    }
}