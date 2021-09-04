// !Imports
//* Normal Components
import React, { useState, useEffect } from 'react';
// * Contexts
import CartContext from './Cart';
// * Database
import db from './../../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
// types
import {
    DocumentReference,
} from '@firebase/firestore';
// * Types
// product-related interfaces
import {
    ProductInterface,
} from '../../interfaces/ComponentsInterfaces';
// function-related types
import {
    AddToCartFunctionInterface,
    RemoveFromCartFunctionInterface,
    ModifyProductAmountFunctionInterface,
    IsInCartFunctionInterface,
    CleanCartFunctionInterface,
    GetProductAmountFunctionInterface,
    GetTotalFunctionInterface,
    GetItemsListFunctionInterface,
    CheckProductForStockFunctionInterface,
    CheckCartForStockFunctionInterface,
} from '../../interfaces/ComponentsInterfaces';

// ! Function Component
const CartProvider: React.FC = ({ children }) => {
    const [Cart, setCart] = useState<ProductInterface[]>(
        (): ProductInterface[] => {
            if (localStorage.getItem('Cart-Array') !== null) {
                return JSON.parse(localStorage.getItem('Cart-Array') || '[]');
            } else {
                return [];
            }
        }
    );

    useEffect(() => {
        localStorage.setItem('Cart-Array', JSON.stringify(Cart));
    }, [Cart]);

    const iva = 10.5;
    const dolar = 180;

    const cleanCart: CleanCartFunctionInterface = () => {
        setCart([]);
    };

    const isInCart: IsInCartFunctionInterface = (product) => {
        if (Cart.length > 0) {
            let flagVar: boolean = false;
            Cart.forEach((productProperties) => {
                if (
                    productProperties.product.id === product.id &&
                    productProperties.product.color === product.color
                ) {
                    flagVar = true;
                }
            });
            if (flagVar === false) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    const addToCart: AddToCartFunctionInterface = (
        productProperties,
        amount
    ) => {
        if (isInCart(productProperties) === false) {
            let newProduct: ProductInterface = {
                product: productProperties,
                amount: amount,
            };
            setCart([...Cart, newProduct]);
        } else if (isInCart(productProperties) === true) {
            modifyProductAmount(productProperties, amount);
        }
    };

    const modifyProductAmount: ModifyProductAmountFunctionInterface = (
        product,
        amount
    ) => {
        if (Cart.length > 0) {
            let newCart: ProductInterface[] = [];
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
    };

    const removeFromCart: RemoveFromCartFunctionInterface = (product) => {
        if (Cart.length > 0) {
            if (isInCart(product) === true) {
                let newCart: ProductInterface[] = [];
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
    };
    const getProductAmount: GetProductAmountFunctionInterface = (product) => {
        if (Cart.length > 0) {
            if (isInCart(product) === true) {
                let productAmount: number = 0;
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
        return 0;
    };
    const getItemsList: GetItemsListFunctionInterface = () => {
        //
        let itemTotalArray: JSX.Element[] = [];
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
    };

    const getTotal: GetTotalFunctionInterface = (option?) => {
        // 1: total with "iva"
        if (Cart.length > 0) {
            let total: number = 0;
            Cart.forEach((productProperties) => {
                total =
                    total +
                    productProperties.amount * productProperties.product.price;
            });
            if (option === 1) {
                total = (total * iva) / 100;
            }
            return total;
        } else {
            return 0;
        }
    };

    const checkProductForStock: CheckProductForStockFunctionInterface = async (
        productProperties,
        productAmount
    ) => {
        let flagVar: boolean = false;
        const docRef: DocumentReference = doc(
            db,
            'items',
            productProperties.id
        );
        const docSnap: any = await getDoc(docRef);
        if (docSnap !== undefined && docSnap.data() !== undefined) {
            if (
                docSnap.data().stock[
                    docSnap.data().colors.indexOf(productProperties.color)
                ] >= productAmount
            ) {
                flagVar = true;
            }
        }
        return flagVar;
    };

    const checkCartForStock: CheckCartForStockFunctionInterface = async () => {
        if (Cart.length > 0) {
            let flagVar: boolean = true;
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
    };

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
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
