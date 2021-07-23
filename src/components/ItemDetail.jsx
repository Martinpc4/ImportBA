import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCounter from "./ItemCounter";

export default function ItemDetail(props) {
    const { CategoryId, ItemId } = useParams();
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);

    function formatProduct(products) {
        products.forEach((productProperties) => {
            if (
                Number(productProperties.categoryId.$numberInt) ===
                    CategoryId &&
                Number(productProperties.id) === ItemId
            ) {
                // TODO Modificar el "!=" una vez que establezcamos los id de categorias
                setProduct(productProperties);
                return;
            }
        });
    }
    async function serverRequest() {
        const serverRequest = fetch(
            "https://webhooks.mongodb-realm.com/api/client/v2.0/app/app-api-horsc/service/HTTP-REQUESTS/incoming_webhook/get-protocol"
        );
        let data = await serverRequest;
        data = await data.text();
        data = JSON.parse(data);

        formatProduct(data);
    }

    useEffect(() => {
        serverRequest();
    }, [ItemId]);

    return (
        <div className="itemDetail">
            <div className="itemDetail__title">
                <p>{product.title}</p>
            </div>
            <div className="itemDetail__model">
                <p>Modelo: {product.model}</p>
            </div>
            <div className="itemDetail__desciription">
                <p>{product.description}</p>
            </div>
            <div className="itemDetail__price">
                <p>{product.price} $ USD</p>
            </div>
            <div className="itemDetail__image">
                <img src={String(product.image)} alt="" />
            </div>
            <div className="itemDetail__actions">
                <ItemCounter
                    itemAmount={amount}
                    itemAmountFunction={setAmount}
                />
            </div>
        </div>
    );
}
