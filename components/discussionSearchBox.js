import styles from "../styles/discussionSearchBox.module.css";
import {Row} from "react-bootstrap";
import * as React from "react";
import Button from 'react-bootstrap/Button';
import CrossSvg from '../public/cross.svg';

export default class DiscussionSearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchText: '', addedTagList:[{
                type: "text",
                id: 0,
                value: ""
            }], searchTagText:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
        this.handleTagSearch = this.handleTagSearch.bind(this);
    }

    handleChange(event) {

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

    handleTagAdd(event) {
        event.preventDefault();
        this.setState({wantedIndexList: [...this.state.wantedIndexList, {
                type: "text",
                id: this.state.wantedIndexList.length,
                value: ""
            }]});
    }

    handleTagRemove(event) {
        event.preventDefault();
        if (this.state.wantedIndexList.length >1){
            this.setState({wantedIndexList: [...this.state.wantedIndexList.slice(0, this.state.wantedIndexList.length-1)]});
        }
    }

    handleTagSearch(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className={`mt-3 ${styles.border}`} >
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <input type="text" name="searchText" style={{width:"50%", borderRadius:"0.25rem"}} value={this.state.searchText} onChange={this.handleChange} />
                        <Button onClick={this.handleSubmit} style={{width:"30%", marginLeft:"1rem", display:"inline-block", background:"#7BA1C7"}}>Search</Button>
                    </Row>
                    <br/>
                    <Row>
                        <label style={{marginLeft:"0px", paddingLeft:"0px", fontSize:"18px", fontWeight:"bold", textAlign:"left"}}>Filters</label>
                    </Row>
                    <Row>
                        <div className={styles.tagsContainer}>
                            <Button style={{backgroundColor:"#FFFFFF", borderColor: "#000000", padding:"1px"}}>
                                <div>
                                    <div className={styles.leftPanel}>
                                        <span style={{color:"#000000", fontSize:"15px", alignSelf:"center"}}>EE4717</span>
                                    </div>
                                    <div className={styles.rightPanel}>
                                        <CrossSvg fill="#7BA1C7" className={styles.crossIcon}/>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <label>
                            <input type="text" name= "currentIndex" value={this.state.addedTagList} onChange={this.handleChange} />
                        </label>
                    </Row>
                    <Button onClick={this.handleAdd} style={{display:"inline-block", margin:"1em", background:"#7BA1C7"}}>+</Button>
                    <Button onClick={this.handleRemove} style={{display:"inline-block", margin:"1em", background:"#7BA1C7"}}>-</Button><br/>
                    <Button as="input" type="submit" value="Create a new request!" style={{margin:"1em", background:"#7BA1C7"}}/>
                </form>
            </div>
        );
    }
}