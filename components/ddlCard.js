import React from "react";
import ReactTimeAgo from "react-time-ago";

export default class DeadlineCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div>
                    <span id='examTitle' style={{float:"left"}}>{this.props.title}</span>
                    <span id='countdown' style={{float:"right"}}><ReactTimeAgo future date={new Date(this.props.dueDate)} timeStyle="mini-minute"/></span>
                </div>
            </>
        );
    }
}