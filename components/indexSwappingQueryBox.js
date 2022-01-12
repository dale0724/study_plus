import styles from "../styles/AnouncementBox.module.css";
import {Card, Row} from "react-bootstrap";
import * as React from "react";
import {Fragment, useState} from "react";

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
        alert('An index swapping request was submitted,  course code: ' + this.state.courseCode + ', current index: '+ this.state.currentIndex + ', wanted index: '+ this.state.wantedIndex+ '. Good Luck!');
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
                    {this.state.wantedIndexList.map((item, i) => {
                        return (
                            <div>
                            <label>Wanted Index {i+1}:
                            <input
                                type="text"
                                name= "wantedIndex"
                                value={item.value}
                                onChange={this.handleChange}
                                id={i}
                            /></label></div>
                        );
                    })}
                    <input type="button" onClick={this.handleAdd} value="+" style={{display:"inline-block", margin:"1em"}}/>
                    <input type="button" onClick={this.handleRemove} value="-"style={{display:"inline-block"}}/><br/>
                    <input type="submit" value="Create a new request!" />
                </form>
            </div>
        );
    }
}