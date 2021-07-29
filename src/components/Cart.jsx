// * Libraries
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.js";
// * Components
import CartList from "./CartList";
// * Context
import CartContext from "./contexts/Cart";

export default function Cart() {
    const { getTotal } = useContext(CartContext);

    return (
        <div className="container h-100 d-flex flex-column justify-content-between">
            <div className="row">
                <CartList listModel={2} />
            </div>
            {getTotal() > 0 ? (
                <div className="row align-items-center">
                    <div className="col-5">
                        <div className="row">
                            <p className="m-0 text-start fs-5">Total</p>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="row">
                            <p className="m-0 text-end price fs-5">{getTotal()} USD$</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <button className="btn btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
