import React from "react";
import ReactTimeAgo from "react-time-ago";

export default class NewsCard extends React.Component {
    constructor(props) {
        super(props);
        this.length = this.props.abstract.length;
    }
    render() {
        return (
            <>
                <div>
                    <div style={{ textAlign: 'left', margin: '0', fontSize: '0.5rem'}}>
                        Last seen: <ReactTimeAgo date={new Date()} />
                    </div>
                    <p style={{ textAlign: 'left', margin: '0' }}>
                        <span id='newsTitle'> Did anyone see Xiaohei recently?</span>
                    </p>
                    <p style={{ textAlign: 'left', fontSize: '0.5rem', margin: '0' }}>
                        {
                            this.length < 200 ? this.props.abstract : `${this.props.abstract.slice(0, 196)}...`
                        }
                    </p>
                </div>
            </>
        );
    }
}