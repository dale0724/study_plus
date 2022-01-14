import React from "react";
import ReactTimeAgo from "react-time-ago";

export default class IndexSwappingRequestCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div>
                    <div style={{ textAlign: 'left', margin: '0', fontSize: '0.5rem'}}>
                        Last seen: <ReactTimeAgo date={new Date()} />
                    </div>
                    <p style={{ textAlign: 'left', margin: '0' }}>
                        <span id='courseNumber'> EE4717 </span>:
                        <span id='anouncemenTitle'> Final Exam Seat Arrangement Released </span>
                    </p>
                </div>
            </>
        );
    }
}