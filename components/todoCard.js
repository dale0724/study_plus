import React from "react";
import {Form} from "react-bootstrap";

export default class TodoCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isDone: false};
        this.handleClick = this.handleClick.bind(this);
      }

    handleClick(){
        this.setState(prevState => ({
            isDone: !prevState.isDone
          }));
    }

    render() {
        return (
        <>
                <Form>
                    <Form.Check type="checkbox">
                    <Form.Check.Input type="checkbox" onClick={this.handleClick}/>
                        <Form.Check.Label style={this.state.isDone?{textDecoration: 'line-through'}:{textDecoration: 'none'}}>Finish EE4771 Home Work</Form.Check.Label>
                    </Form.Check>
                </Form>
        </>
    );}
}