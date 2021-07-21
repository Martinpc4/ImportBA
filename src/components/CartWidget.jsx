import React, {useState} from "react";
import ShoppingCartList from "./ShoppingCartList";

export default function CartWidget() {
    const [clickedState, setClickedState] = useState(false);

    return (
        <div>
            <i className="bi bi-cart" onClick={
                    clickedState === false ? () => {setClickedState(true);} : () => {setClickedState(false);}
                }>
                { clickedState === true ? <ShoppingCartList /> : '' }
            </i>
        </div>
    );
}
