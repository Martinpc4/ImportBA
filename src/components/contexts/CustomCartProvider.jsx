import React, { useState, useEffect } from 'react';
import Cart from './Cart.jsx';

export default function CustomCartProvider(props) {
    const [cart, setCart] = useState([]);

    function retrieveCart() {
        let localCart = localStorage.getItem("localCart");
        localCart = JSON.parse(localCart);
        if (localCart !== undefined) {
            setCart(localCart);
        }
        else if (localCart === undefined) {
            setCart([]);
        }
    }

    function cleanCart () {
        setCart([]);
    }

    function addToCart(product) {
        setCart([...cart, product]);
    };

    function removeFromCart(productProperties, amount) {
        let newCart = [];
        cart.forEach(product => {
            if ((product.id == productProperties.id) && (product.color == productProperties.color) && (product.amount > 0)) {
                product.amount--;
                newCart = [...newCart, product]
            }
            else {
                newCart = [...newCart, product]
            }
        });
        setCart(newCart);
    }

    useEffect(() => {
        retrieveCart();
    },[]);

    return (
        <Cart.Provider value={cart}>
            {props.children}
        </Cart.Provider>
    )
}
