import styles from "../../styles/discussionSearchBox.module.css";
import { Row} from "react-bootstrap";
import * as React from "react";
import Button from 'react-bootstrap/Button';
import CrossSvg from '../../public/cross.svg';

export default class DiscussionSearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchText: '', addedTagList:[{
                type: "text",
                id: 0,
                value: "EE4717"
            }], searchTagText:'', id:"0"};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
        this.handleTagSearch = this.handleTagSearch.bind(this);
    }

    handleChange(event) {
        if (event.target.name==="searchText"){
            this.setState({searchText: event.target.value});
        }else if (event.target.name==="searchTagText"){
            this.setState({searchTagText: event.target.value});
        }

    }

    handleSubmit(event) {
        /*connect to DB and search for matched result*/
        event.preventDefault();
    }

    handleTagAdd(event) {
        const newID = parseInt(this.state.id)+1;
        const newValue = event.currentTarget.value
        this.setState((prevState) => ({
            addedTagList: [...prevState.addedTagList, {
                type: "text",
                id: parseInt(prevState.id)+1,
                value: newValue
            }],
            id: parseInt(prevState.id)+1
        }));
        event.preventDefault();
    }

    handleTagRemove(event) {
        const toDeleteID = parseInt(event.currentTarget.id)
        const before = [...this.state.addedTagList]
        const after = before.filter(function(obj) {
            return parseInt(obj.id) !== toDeleteID;
        });
        this.setState({addedTagList: after});
        event.preventDefault();
    }

    handleTagSearch(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className={`mt-3 ${styles.border}`} >
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <input type="text" name="searchText" style={{width:"50%", borderRadius:"0.25rem", borderColor:"#395075"}} value={this.state.searchText} onChange={this.handleChange} placeholder={"search posts..."}/>
                        <Button onClick={this.handleSubmit} style={{width:"30%", marginLeft:"1rem", display:"inline-block", background:"#395075"}}>Search</Button>
                    </Row>
                    <br/>
                    <Row>
                        <label style={{marginLeft:"0px", paddingLeft:"0px", fontSize:"18px", fontWeight:"bold", textAlign:"left"}}>Filters</label>
                    </Row>
                    <Row>
                        <div className={styles.tagsContainer}>
                            {this.state.addedTagList.map((item) => {
                                return (
                                    <React.Fragment key={item.id}>
                                        <Button  id={item.id} style={{backgroundColor:"#c5d3e6", borderColor: "#000000", padding: "2px", marginRight: "0.25rem"}} onClick={this.handleTagRemove}>
                                            <div>
                                                <div className={styles.leftPanel}>
                                                    <span style={{color:"#FFFFFF", alignSelf:"center"}}>{item.value}</span>
                                                </div>
                                                <div className={styles.rightPanel}>
                                                    <CrossSvg fill="#FFFFFF"/>
                                                </div>
                                            </div>
                                        </Button>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </Row>
                    <br/>
                    <Row>
                        <input type="text" name="searchTagText" style={{width:"50%", borderRadius:"0.25rem", borderColor:"#395075"}} value={this.state.searchTagText} onChange={this.handleTagSearch} placeholder={"search for tags..."}/>
                    </Row>
                    <Row>
                        <div className={styles.searchTagsResultContainer}>
                            <Button value="javascript" style={{backgroundColor:"#d8e0eb", borderColor: "#000000", padding:"2px", marginRight:"0.25rem"}} onClick={this.handleTagAdd}>
                                <div>
                                    <div className={styles.leftPanel}>
                                        <span style={{color:"#000000", fontSize:"15px", alignSelf:"center"}}>javascript</span>
                                    </div>
                                    <div className={styles.rightPanel}>
                                        <span style={{color:"#000000", fontSize:"15px", alignSelf:"center"}}>20</span>
                                    </div>
                                </div>
                            </Button>
                            <Button value="PHP" style={{backgroundColor:"#d8e0eb", borderColor: "#000000", padding:"2px", marginRight:"0.25rem"}} onClick={this.handleTagAdd}>
                                <div>
                                    <div className={styles.leftPanel}>
                                        <span style={{color:"#000000", fontSize:"15px", alignSelf:"center"}}>PHP</span>
                                    </div>
                                    <div className={styles.rightPanel}>
                                        <span style={{color:"#000000", fontSize:"15px", alignSelf:"center"}}>18</span>
                                    </div>
                                </div>
                            </Button>
                            <Button value="Mysql DB" style={{backgroundColor:"#d8e0eb", borderColor: "#000000", padding:"2px", marginRight:"0.25rem"}} onClick={this.handleTagAdd}>
                                <div>
                                    <div className={styles.leftPanel}>
                                        <span style={{color:"#000000", fontSize:"15px", alignSelf:"center"}}>Mysql DB</span>
                                    </div>
                                    <div className={styles.rightPanel}>
                                        <span style={{color:"#000000", fontSize:"15px", alignSelf:"center"}}>25</span>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </Row>
                    </form>
            </div>
        );
    }
}