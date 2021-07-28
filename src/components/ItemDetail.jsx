// * Libraries
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/firebase.js";
// * Components
import ItemCounter from "./ItemCounter";
// * Context
import Cart from "./contexts/Cart";

export default function ItemDetail(props) {
    const { CategoryId, ItemId } = useParams();
    const [product, setProduct] = useState({});
    const [productMemory, setProductMemory] = useState(0);
    const [productColor, setProductColor] = useState("");
    const [amount, setAmount] = useState(0);
    let { addToCart } = useContext(Cart);

    function formatProduct(data) {
        let product = data.data();
        product.id = data.id;

        // Memory
        setProductMemory(product.memory[0]);
        product.memory = product.memory.map((memVal) => {
            return (<option value={memVal}>{memVal}</option>);
        });
        
        // Colors
        setProductColor(product.colors[0]);
        product.colors = product.colors.map((colorVal) => {
            return (<option value={colorVal}>{colorVal}</option>);
        });

        return {
            title: product.title,
            price: product.price,
            description: product.description,
            memory: product.memory,
            imageURL: product.imageURL,
            colors: product.colors,
        };
    }
    async function serverRequest() {
        const itemCollection = db.collection("items");
        itemCollection
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    if (
                        doc.id === ItemId && // doc id es un string
                        doc.data().categoryId === Number(CategoryId)
                    ) {
                        const product = formatProduct(doc);
                        setProduct(product);
                    }
                });
            })
            .catch((err) => {
                throw new Error(`Error de obtención de datos de bd: ${err}`);
            });
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
                    <select
                        onChange={(e) => {
                            setProductMemory(Number(e.target.value));
                        }}
                    >
                        {product.memory}
                    </select>
                </div>
                <div className="itemDetail__info-ctr__colors">
                    <select value ={productColor}
                        onChange={(e) => {
                            setProductColor(String(e.target.value));
                        }}
                    >
                        {product.colors}
                    </select>
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
                            <button
                                type="button"
                                onClick={() => {
                                    product.memory = productMemory;
                                    delete product.colors;
                                    product.color = productColor;
                                    addToCart(product, amount);
                                }}
                                className="btn btn-secondary"
                            >
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
