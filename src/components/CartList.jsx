// * Libraries
import React, { useContext, useEffect, useState } from "react";
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
        formatProductData();
    }, []);

    return <>{products}</>;
}
