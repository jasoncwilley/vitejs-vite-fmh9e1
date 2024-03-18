import React from "react";
import './ARweaveButton.css'

const ARweaveButton= (props) => {
    return(
        <button className="item-button" type={props.type} onclick={props.onClick}>
            {props.heading}
            <br/>
            <span className="sub-head">{props.subheading}</span>
        </button>
    )
}
export default ARweaveButton;
