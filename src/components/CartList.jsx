import React, { useContext } from "react";
import Cart from "./contexts/Cart";

export default function CartList({ changeClickedSatate }) {
    const { cart } = useContext(Cart);
    return (
        <div className="cartList">
            <div className="cartList__header">
                <p>Productos</p>
            </div>
            <div className="cartList__actions">
                <i className="bi bi-x" onClick={changeClickedSatate}/>
            </div>
            <div className="cartList__items-ctr"></div>
        </div>
    );
}
