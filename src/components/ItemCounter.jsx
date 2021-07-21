import React from 'react';
import { useState } from 'react';

export default function ItemCount() {
    const [itemCount, setItemCount] = useState(0);
    return (
        <div className="itemCount">
            <div className="itemCount__counter-ctr">
                <div className="itemCount__counter-ctr__plus-btn">
                    <i className="bi bi-plus-lg" onClick={
                        () => {setItemCount(itemCount + 1)}
                    }></i>
                </div>
                <div className="itemCount__counter-ctr__counter">
                    <p>{itemCount}</p>
                </div>
                <div className="itemCount__counter-ctr__substr-btn">
                    <i className="bi bi-dash-lg" onClick={
                        itemCount > 0 ? () => {setItemCount(itemCount - 1)} : undefined
                    }></i>
                </div>
            </div>
            <div className="itemCount__cart-ctr">
                <button className="itemCount__cart-ctr__btn">Agregar al carrito</button>
            </div>
        </div>
    )
}