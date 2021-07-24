import React, { useEffect, useState } from "react";
import Item from "./Item";

export default function ItemList({ categoryId }) {
    const [products, setProducts] = useState([]);

    function formatProducts(products) {
        let productsArray = [];
        products.forEach((productProperties) => {
            if (Number(productProperties.categoryId.$numberInt) === Number(categoryId)) {
                productsArray.push(
                    <Item
                        key={Number(productProperties.id.$numberInt)}
                        id={Number(productProperties.id.$numberInt)}
                        title={productProperties.title}
                        memory={Number(productProperties.memory.$numberInt)}
                        colors={Number(productProperties.colors)}
                        description={productProperties.descripcion}
                        price={Number(productProperties.price.$numberInt)}
                        imageURL={productProperties.imageURL}
                        categoryId={productProperties.categoryId.$numberInt}
                    />
                );
            }
        });
        return productsArray;
    }
    async function serverRequest() {
        const serverRequest = fetch(
            "https://webhooks.mongodb-realm.com/api/client/v2.0/app/app-api-horsc/service/HTTP-REQUESTS/incoming_webhook/get-protocol"
        );
        let data = await serverRequest;
        data = await data.text();
        data = JSON.parse(data);

        setProducts(formatProducts(data));
    }

    useEffect(() => {
        serverRequest();
    }, [categoryId]);

    return <div className="itemList">{products}</div>;
}
