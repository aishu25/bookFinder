import React from 'react';
import './popup.css';

const popup = (props) => {
    return(
        <div className="popup">
            <div className="inner_popup">
            <a href={props.info} className="button" target="_blank">More Info</a>
            </div>
        </div>
    )
}

export default popup;

// <a href={props.info} className="button" target="_blank">More Info</a>