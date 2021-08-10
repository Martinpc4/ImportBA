import React, { useState, useEffect } from 'react';
import CartContext from './Cart.jsx';
import { db } from '../../firebase/firebase';

export default function CustomCartProvider(props) {
    const [Cart, setCart] = useState(() => {
        console.log("RECUPERADO");
        if (localStorage.getItem('Cart-Array') !== null) {
            return JSON.parse(localStorage.getItem('Cart-Array'));
        } else {
            return [];
        }
    });

    useEffect(() => {
        console.log("GUARDADO");
        localStorage.setItem('Cart-Array', JSON.stringify(Cart));
    }, [Cart]);

    const iva = 10.5;
    const dolar = 180;

    function cleanCart() {
        setCart([]);
    }

    function isInCart(product) {
        if (Cart.length > 0) {
            let flagVar = false;
            Cart.forEach((productProperties) => {
                if (
                    productProperties.product.id === product.id &&
                    productProperties.product.color === product.color
                ) {
                    flagVar = true;
                }
            });
            if (flagVar === true) {
                return true;
            } else if (flagVar === false) {
                return false;
            }
        } else {
            return false;
        }
    }

    function addToCart(product, amount) {
        if (isInCart(product) === false) {
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
                    productProperties.product.id === product.id &&
                    productProperties.product.color === product.color
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
            throw new Error('Error: El carrito se encuentra vacio');
        }
    }

    function removeFromCart(product) {
        if (Cart.length > 0) {
            if (isInCart(product) === true) {
                let newCart = [];
                Cart.forEach((productProperties) => {
                    if (
                        !(
                            productProperties.product.id === product.id &&
                            productProperties.product.color === product.color
                        )
                    ) {
                        newCart = [...newCart, productProperties];
                    }
                });
                setCart(newCart);
            } else if (isInCart(product) === false) {
                throw new Error(
                    'Error: El producto no se encuentra en el carrito'
                );
            }
        } else {
            throw new Error('Error: El carrito se encuentra vacio');
        }
    }
    function getProductAmount(product) {
        if (Cart.length > 0) {
            if (isInCart(product) === true) {
                let productAmount = 0;
                Cart.forEach((productProperties) => {
                    if (
                        productProperties.product.id === product.id &&
                        productProperties.product.color === product.color
                    ) {
                        productAmount = productProperties.amount;
                    }
                });
                return productAmount;
            } else if (isInCart(product) === false) {
                throw new Error(
                    'Error: El producto no se encuentra en el carrito'
                );
            }
        } else {
            throw new Error('Error: El carrito se encuentra vacio');
        }
    }
    function getItemsList() {
        //
        let itemTotalArray = [];
        Cart.forEach((cartItem) => {
            itemTotalArray.push(
                <div key={cartItem.product.id} className='row'>
                    <div className='col-6'>
                        <p className='text-start text-muted'>
                            {cartItem.product.title}
                        </p>
                    </div>
                    <div className='col-6'>
                        <p className='text-end text-muted'>
                            {cartItem.product.price * cartItem.amount} USD$
                        </p>
                    </div>
                </div>
            );
        });
        return itemTotalArray;
    }

    function getTotal(option) {
        // 1: total with "iva"
        if (Cart.length > 0) {
            let total = 0;
            Cart.forEach((productProperties) => {
                total =
                    total +
                    (productProperties.amount * productProperties.product.price);
            });
            if (option === 1) {
                total = (total * iva) / 100;
            }
            return total;
        } else {
            throw new Error(
                'Error al tomar el total de los productos: el carrito esta vacio'
            );
        }
    }

    async function checkProductForStock(productProperties, amount) {
        let flagVar = false;
        let collection = db.collection('items');
        const data = await collection.doc(productProperties.id).get();
        try {
            if (
                data.data().stock[
                    data.data().colors.indexOf(productProperties.color)
                ] >= amount
            ) {
                flagVar = true;
            }
        } catch (err) {
            throw new Error('Error en el chequeo de productos: \n\n' + err);
        }
        return flagVar;
    }

    async function checkCartForStock() {
        if (Cart.length > 0) {
            let flagVar = true;
            for (const productProperties of Cart) {
                if (
                    (await checkProductForStock(
                        productProperties.product,
                        productProperties.amount
                    )) === false
                ) {
                    flagVar = false;
                }
            }
            return flagVar;
        } else {
            throw new Error('The Cart is Empty');
        }
    }

    return (
        <CartContext.Provider
            value={{
                iva,
                dolar,
                Cart,
                addToCart,
                removeFromCart,
                modifyProductAmount,
                isInCart,
                cleanCart,
                getProductAmount,
                getTotal,
                getItemsList,
                checkProductForStock,
                checkCartForStock,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
