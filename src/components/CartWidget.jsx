import React, { useState } from "react";
import CartList from "./CartList";

export default function CartWidget() {
    const [clickedState, setClickedState] = useState(false);

    function checkClickedState(e) {
        e.stopPropagation();
        if (clickedState === true) {
            setClickedState(false);
        } else {
            setClickedState(true);
        }
    }
    return (
        <div>
            <i className="bi bi-cart" onClick={checkClickedState}></i>
            {clickedState === true ? (
                <CartList changeClickedSatate={checkClickedState} />
            ) : null}
        </div>
    );
}
