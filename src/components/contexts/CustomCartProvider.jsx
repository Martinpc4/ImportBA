import React, { useState, useEffect } from "react";
import CartContext from "./Cart.jsx";

export default function CustomCartProvider(props) {
    const [Cart, setCart] = useState([]);

    const iva = 10.5;
    const dolar = 180;
    const impuestoPais = 30;

    useEffect(() => {
    }, [Cart]);

    function cleanCart() {
        setCart([]);
    }

    function isInCart(product) {
        if (Cart.length > 0) {
            let flagVar = false;
            Cart.forEach((productProperties) => {
                if (
                    productProperties.product.id == product.id &&
                    productProperties.product.color == product.color
                ) {
                    flagVar = true;
                }
            });
            if (flagVar === true) {
                return true;
            }
            else if (flagVar === false) {
                return false;
            }
        } else {
            return false;
        }
    }

    function addToCart(product, amount) {
        console.log(product);
        console.log(amount);
        console.log(isInCart(product));
        if (isInCart(product) === false) {
            console.log("ENTRe");
            let newProduct = {
                product: product,
                amount: amount,
            };
            setCart([...Cart, newProduct]);
        } else if (isInCart(product) === true) {
            modifyProductAmount(product, amount);
        }
    }

    function modifyProductAmount(product, amount) {
        if (Cart.length > 0) {
            let newCart = [];
            Cart.forEach((productProperties) => {
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

    function removeFromCart(product) {
        if (Cart.length > 0) {
            if (isInCart(product) === true) {
                let newCart = [];
                Cart.forEach((productProperties) => {
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
        if (Cart.length > 0) {
            if (isInCart(product) === true) {
                let productAmount = 0;
                Cart.forEach((productProperties) => {
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
    function getItemsList() {
        let itemTotalArray = [];
        Cart.forEach((cartItem) => {
            itemTotalArray.push(
                <div key={cartItem.product.id} className="row">
                    <div className="col-6">
                        <p className="text-start text-muted">
                            {cartItem.product.title}
                        </p>
                    </div>
                    <div className="col-6">
                        <p className="text-end text-muted">
                            {cartItem.product.price * cartItem.amount} USD$
                        </p>
                    </div>
                </div>
            );
        });
        return itemTotalArray;
    }
    function getTotal(option) {
        // 1: total with "iva" - 2: total with "impuesto pais"
        let total = 0;
        Cart.forEach((productProperties) => {
            total =
                total +
                productProperties.amount * productProperties.product.price;
        });
        if (option === 1) {
            total = (total * dolar * iva) / 100;
        } else if (option === 2) {
            total = (total * dolar * impuestoPais) / 100;
        }
        return total;
    }

    return (
        <CartContext.Provider
            value={{
                iva,
                dolar,
                impuestoPais,
                Cart,
                addToCart,
                removeFromCart,
                modifyProductAmount,
                isInCart,
                cleanCart,
                getProductAmount,
                getTotal,
                getItemsList,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
