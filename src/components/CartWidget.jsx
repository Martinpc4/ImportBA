// * Libraries
import React, { useState, useEffect, useContext } from "react";
// * Component
import CartList from "./CartList";
// * Contexts
import CartContext from './contexts/Cart';

export default function CartWidget() {
    const [clickedState, setClickedState] = useState(false);
    const { cart } = useContext(CartContext);

    function checkClickedState(e) {
        e.stopPropagation();
        if (clickedState === true) {
            setClickedState(false);
        } else {
            setClickedState(true);
        }
    }

    useEffect(() => {}, [cart]);

    return (
        <>
            <i className="bi bi-cart" onClick={checkClickedState}></i>
            {clickedState === true ? (
                <div className=" container cartList">
                    <div className="row">
                            <p className="m-0 fs-5 text-center">Productos</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <CartList listModel={1} />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
