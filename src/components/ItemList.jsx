import React, { useEffect, useState } from "react";
import Item from "./Item";

import { db } from "../firebase/firebase.js";

export default function ItemList({ categoryId, vertical }) {
    const [products, setProducts] = useState([]);

    function formatProduct(data) {
        let product = data.data();
        product.id = data.id;

        return (
            <div className="col-xs-6 col-sm-6 col-md-4">
                <Item
                    key={`${product.id}-${product.colors}`}
                    id={product.id}
                    title={product.title}
                    memory={product.memory}
                    colors={product.colors}
                    description={product.description}
                    price={product.price}
                    imagesURL={product.imagesURL}
                    categoryId={product.categoryId}
                />
            </div>
        );
    }
    async function serverRequest() {
        const itemCollection = db.collection("items");
        itemCollection
            .get()
            .then((data) => {
                let products = [];
                data.forEach((doc) => {
                    if (doc.data().categoryId === Number(categoryId)) {
                        products = [...products, formatProduct(doc)];
                    }
                });
                setProducts(products);
            })
            .catch((err) => {
                throw new Error(`Error de obtención de datos de bd:\n\n${err}`);
            });
    }

    useEffect(() => {
        serverRequest();
    }, [categoryId]);

    return (
        <div className="container">
            <div className="row gy-4 gx-5">{products}</div>
        </div>
    );
}
