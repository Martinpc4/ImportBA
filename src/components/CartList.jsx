// * Libraries
import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// * Components
import ItemCart from "./ItemCart";
// * Contexts
import CartContext from "./contexts/Cart";

export default function CartList({ listModel }) {
    const [products, setProducts] = useState([]);
    const {
        cart,
        addToCart,
        removeFromCart,
        modifyProductAmount,
        isInCart,
        cleanCart,
    } = useContext(CartContext);

    function formatProductData() {
        let itemCartList = [];
        cart.forEach((productProperties) => {
            itemCartList.push(
                <ItemCart
                    key={productProperties.id}
                    productProperties={productProperties}
                    listModel={listModel}
                />
            );
        });
        setProducts(itemCartList);
    }

    useEffect(() => {
        if (cart != []) {
            formatProductData();
        }
    }, []);

    if (cart.length > 0) {
        return (<>{products}</>);
    }
    else {
        return(
            <div className="row align-items-center">
                <Link to="/" className="text-decoration-none text-muted">
                    <p className={`text-center mx-0 my-3 ${listModel === 1 ? 'fs-6' : 'fs-4'}`}>Todavia no hay productos!</p>
                </Link>
            </div>
        );
    }
}
