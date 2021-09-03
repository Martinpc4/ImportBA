// ! Imports
// * Components
import React from 'react';
// * Types
import { CartContextInterface } from '../../interfaces/ComponentsInterfaces';

const Cart = React.createContext<null | CartContextInterface>(null);

export default Cart;
