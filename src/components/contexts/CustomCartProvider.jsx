import React, { useState } from "react";
import Cart from "./Cart.jsx";

export default function CustomCartProvider(props) {
    const [cart, setCart] = useState([]);

    function cleanCart() {
        setCart([]);
    }

    function isInCart(productId) {
        if (cart != []) {
            cart.forEach((productProperties) => {
                if (productProperties.id == productId) {
                    return true;
                }
            });
        }
        return false;
    }

    function addToCart(product, Amount) {
        if (isInCart(product.id) === false) {
            let newProduct = {
                item: product,
                amount: Amount,
            };
            setCart([...cart, newProduct]);
        } else if (isInCart(product.id) === true) {
            modifyProductAmount(product.id, 1);
        }
    }

    function modifyProductAmount(productId, amount) {
        if (cart != []) {
            let newCart = [];
            cart.forEach((productProperties) => {
                if (productProperties.item.id == productId) {
                    productProperties.item.amount =
                        productProperties.item.amount + amount;
                    newCart = [...newCart, productProperties];
                } else {
                    newCart = [...newCart, productProperties];
                }
            });
            setCart(newCart);
        } else {
            throw new Error("Error: El carrito se encuentra vacio");
        }
    }

    function removeFromCart(product, amount) {
        if (cart != []) {
            if (isInCart(product.id) === true) {
                let newCart = [];
                cart.forEach((productProperties) => {
                    if (
                        productProperties.item.id == product.id &&
                        productProperties.color == product.color
                    ) {
                        if (productProperties.item.amount > amount) {
                            productProperties.item.amount--;
                            newCart = [...newCart, productProperties];
                        }
                    } else {
                        newCart = [...newCart, product];
                    }
                });
                setCart(newCart);
            } else if (isInCart(product.id) === false) {
                throw new Error(
                    "Error: El producto no se encuentra en el carrito"
                );
            }
        } else {
            throw new Error("Error: El carrito se encuentra vacio");
        }
    }

    return (
        <Cart.Provider value={{ cart, addToCart }}>
            {props.children}
        </Cart.Provider>
    );
}
