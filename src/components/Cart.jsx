// * Libraries
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// * Components
import CartList from "./CartList";
// * Context
import CartContext from "./contexts/Cart";

export default function Cart() {
    const { getTotal, getItemsList, iva, dolar, impuestoPais } =
        useContext(CartContext);

    return (
        <div className="container">
            <div className="row h-100">
                <div className="py-2 col-12 d-flex flex-column justify-content-between">
                    <div className="row gy-2">
                        <CartList listModel={2} />
                    </div>
                    {getTotal() > 0 ? (
                        <div className="row align-items-center">
                            <div className="col-6">
                                <div className="row">
                                    <p className="m-0 text-start fs-5">Total</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <p className="m-0 text-end price fs-5">
                                        {getTotal()} USD$
                                    </p>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="row">
                                    <Link
                                        to="/Checkout"
                                        className="d-flex flex-column align-items-center text-decoration-none"
                                    >
                                        <button className="btn btn-primary w-100">
                                            Checkout
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
