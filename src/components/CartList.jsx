// * Libraries
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// * Components
import ItemCart from "./ItemCart";
// * Contexts
import CartContext from "./contexts/Cart";

export default function CartList({ listModel }) {
    const [products, setProducts] = useState([]);
    const { Cart } = useContext(CartContext);

    function formatProductData() {
        let itemCartList = [];
        Cart.forEach((productProperties) => {
            itemCartList.push(
                <ItemCart
                    productProperties={productProperties}
                    listModel={listModel}
                />
            );
        });
        setProducts(itemCartList);
    }

    useEffect(() => {
        if (Cart.length > 0) {
            formatProductData();
        }
    }, [Cart]);

    if (Cart.length > 0) {
        return <>{products}</>;
    } else {
        return (
            <div className="row align-items-center">
                <Link to="/" className="text-decoration-none text-muted">
                    <p
                        className={`text-center mx-0 my-3 ${
                            listModel === 1 ? "fs-6" : "fs-4"
                        }`}
                    >
                        Todavia no hay productos!
                    </p>
                </Link>
            </div>
        );
    }
}
