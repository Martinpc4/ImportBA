import React, { useEffect, useState } from 'react';
import Item from './Item';
import { useParams } from 'react-router-dom'

export default function ItemList(props) {
    const { CategoryId } = useParams();
    const [products, setProducts] = useState([]);

    async function serverRequest () {
        const serverRequest = fetch("https://webhooks.mongodb-realm.com/api/client/v2.0/app/app-api-horsc/service/HTTP-REQUESTS/incoming_webhook/get-protocol");
        let data = await serverRequest;
        data = await data.text();
        data = JSON.parse(data);

        formatProducts(data);
    };
    
    function formatProducts(products) {
        let productsArray = products.map((product) => {
            return (
                <Item
                    key={product.id}
                    id={Number(product.id)}
                    title={product.title}
                    description={product.descripcion}
                    price={Number(product.price)}
                    imageURL={product.image}
                />
            );
        });
        setProducts(productsArray);
    }

    useEffect(() => {
        serverRequest();
    });

    return <div className="itemList">{products}</div>;
}