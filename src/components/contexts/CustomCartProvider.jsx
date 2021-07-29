import React, { useState } from "react";
import Cart from "./Cart.jsx";

export default function CustomCartProvider(props) {
    const [cart, setCart] = useState([]);

    function cleanCart() {
        setCart([]);
    }

    function isInCart(product) {
        if (cart != []) {
            let flagVar = false;
            cart.forEach((productProperties) => {
                if ((productProperties.product.id == product.id) && (productProperties.product.color == product.color)) {
                    flagVar = true;
                }
            });
            if (flagVar === true) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            throw new Error("Error: El carrito se encuentra vacio");
        }
    }

    function addToCart(product, amount) {
        if (isInCart(product) === false) {
            let newProduct = {
                product: product,
                amount: amount,
            };
            setCart([...cart, newProduct]);
        } else if (isInCart(product) === true) {
            modifyProductAmount(product, amount);
        }
    }

    function modifyProductAmount(product, amount) {
        if (cart != []) {
            let newCart = [];
            cart.forEach((productProperties) => {
                if (
                    productProperties.product.id == product.id &&
                    productProperties.product.color == product.color
                ) {
                    productProperties.amount =
                        productProperties.amount + amount;
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
            if (isInCart(product) === true) {
                let newCart = [];
                cart.forEach((productProperties) => {
                    if (
                        !(
                            productProperties.product.id == product.id &&
                            productProperties.product.color == product.color
                        )
                    ) {
                        newCart = [...newCart, product];
                    }
                });
                setCart(newCart);
            } else if (isInCart(product) === false) {
                throw new Error(
                    "Error: El producto no se encuentra en el carrito"
                );
            }
        } else {
            throw new Error("Error: El carrito se encuentra vacio");
        }
    }
    function getProductAmount(product) {
        if (cart != []) {
            if (isInCart(product) === true) {
                let productAmount = 0;
                cart.forEach((productProperties) => {
                    if (
                        productProperties.product.id == product.id &&
                        productProperties.product.color == product.color
                        ) {
                            productAmount = productProperties.amount;
                        }
                    });
                return productAmount;
            } else if (isInCart(product) === false) {
                throw new Error(
                    "Error: El producto no se encuentra en el carrito"
                );
            }
        } else {
            throw new Error("Error: El carrito se encuentra vacio");
        }
    }

    return (
        <Cart.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                modifyProductAmount,
                isInCart,
                cleanCart,
                getProductAmount
            }}
        >
            {props.children}
        </Cart.Provider>
    );
}
