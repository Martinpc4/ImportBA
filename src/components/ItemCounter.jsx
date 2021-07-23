import React from 'react';

export default function ItemCount(props) {
    return (
        <div className="itemCount">
            <div className="itemCount__counter-ctr">
                <div className="itemCount__counter-ctr__plus-btn">
                    <i className="bi bi-plus-lg" onClick={
                        () => {props.itemAmountFunction(props.itemAmount + 1)}
                    }></i>
                </div>
                <div className="itemCount__counter-ctr__counter">
                    <p>{props.itemAmount}</p>
                </div>
                <div className="itemCount__counter-ctr__substr-btn">
                    <i className="bi bi-dash-lg" onClick={
                        props.itemAmount > 0 ? () => {props.itemAmountFunction(props.itemAmount - 1)} : undefined
                    }></i>
                </div>
            </div>
            <div className="itemCount__cart-ctr">
                <button className="itemCount__cart-ctr__btn">Agregar al carrito</button>
            </div>
        </div>
    )
}