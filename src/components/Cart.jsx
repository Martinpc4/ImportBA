// * Libraries
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.js";
// * Components
import CartList from './CartList';

export default function Cart() {
    

    return (
            <div className="container">
                <div className="row">
                    <CartList
                        listModel={2}
                    />
                </div>
            </div>
    );
}
