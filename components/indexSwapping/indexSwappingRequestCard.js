import React from "react";
import styles from "../../styles/indexSwappingRequestCard.module.css";
import Link from "next/link";

export default class IndexSwappingRequestCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div>
                    <p style={{ textAlign: 'left', margin: '0' }}>
                        <Link href={"/indexSwappingRequest/"+this.props.id} passHref><a className={styles.requestTitle}>{this.props.title}</a></Link>
                    </p>
                    <div style={{ textAlign: 'left', margin: '0', fontSize: '0.75rem'}}>
                        Dale created at {Date().toString()}
                    </div>
                </div>
            </>
        );
    }
}