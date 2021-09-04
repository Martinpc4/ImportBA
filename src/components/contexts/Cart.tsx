// ! Imports
// * Components
import React from 'react';
// * Types
import { CartContextInterface } from '../../interfaces/ComponentsInterfaces';

const CartDefaultValue = {
    iva: 0,
    dolar: 0,
    Cart: undefined,
    addToCart: () => {},
    removeFromCart: () => {},
    modifyProductAmount: () => {},
    isInCart: () => false,
    cleanCart: () => {},
    getProductAmount: () => 0,
    getTotal: () => 0,
    getItemsList: () => [],
    checkProductForStock: async () => false,
    checkCartForStock: async () => false,
}

const Cart = React.createContext<CartContextInterface>(CartDefaultValue);

export default Cart;
