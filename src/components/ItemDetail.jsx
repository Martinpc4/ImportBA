// * Libraries
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
// * Components
import ItemCounter from "./ItemCounter";
// * Context
import Cart from './contexts/Cart';

export default function ItemDetail(props) {
    const { CategoryId, ItemId } = useParams();
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(0);
    let { addToCart } = useContext(Cart);


    function formatProduct(data) {
        data.forEach((productProperties) => {
            // TODO Remover estas dos varaibles una vez que migre a la firebase db
            productProperties.id = productProperties.id.$numberInt;
            productProperties.categoryId =
                productProperties.categoryId.$numberInt;
            if (
                productProperties.categoryId === CategoryId &&
                productProperties.id === ItemId
            ) {
                // TODO Remover el objeto creado explicitamente y decomentar la variable productProperties cuando cambiemos de db
                setProduct(
                    // productProperties
                    {
                        title: productProperties.title,
                        price: productProperties.price.$numberInt,
                        description: productProperties.description,
                        memory: productProperties.memory.$numberInt,
                        imageURL: productProperties.imageURL,
                        colors: productProperties.colors.join(", "),
                    }
                );
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
            <div className="itemDetail__image">
                <img src={String(product.imageURL)} alt="" />
            </div>
            <div className="itemDetail__info-ctr">
                <div className="itemDetail__info-ctr__title">
                    <p>{product.title}</p>
                </div>
                <div className="itemDetail__info-ctr__model">
                    <p>
                        Modelo: {product.title} - {product.memory}Gb
                    </p>
                </div>
                <div className="itemDetail__info-ctr__colors">
                    <p>Colores: {product.colors}</p>
                </div>
                <div className="itemDetail__info-ctr__description">
                    <p>{product.description}</p>
                </div>
                <div className="itemDetail__info-ctr__price">
                    <p>{product.price} $ USD</p>
                </div>
            </div>
            <div className="itemDetail__actions">
                <div className="itemDetail__actions__counter">
                    <p>Cantidad</p>
                    <ItemCounter
                        itemAmount={amount}
                        itemAmountFunction={setAmount}
                    />
                </div>
                <div className="itemDetail__actions__purchase-ctr">
                    {amount >= 1 ? (
                        <Link to="/Cart">
                            <button type="button" onClick={() => {addToCart(product, amount)}} className="btn btn-secondary">
                                Agregar al carrito
                            </button>
                        </Link>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
