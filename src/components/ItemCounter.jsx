import React from 'react';

export default function itemCounter(props) {
    return (
        <div className="itemCounter">
            <div className="itemCounter__plus-btn">
                <i className="bi bi-plus-lg" onClick={
                    () => { props.itemAmountFunction(props.itemAmount + 1) }
                }></i>
            </div>
            <div className="itemCounter__counter">
                <p>{props.itemAmount}</p>
            </div>
            <div className="itemCounter__substr-btn">
                <i className="bi bi-dash-lg" onClick={
                    props.itemAmount > 1 ? () => { props.itemAmountFunction(props.itemAmount - 1) } : undefined
                }></i>
            </div>
        </div>
    )
}