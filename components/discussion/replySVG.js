import React from "react";

export default function ReplySVG(props) {
    return (
        <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg" onClick={props.handleClick}>
            <path
                d="M8 4L4.35355 7.64645C4.15829 7.84171 4.15829 8.15829 4.35355 8.35355L8 12"
                stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            <path
                d="M5 8H14.5C17.5376 8 20 10.4624 20 13.5V13.5C20 16.5376 17.5376 19 14.5 19H5"
                stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}