import React, { useEffect, useState } from 'react';
import Item from './Item';

export default function ItemList({categoryId}) {
    const [products, setProducts] = useState([]);
    
    function formatProducts(products) {
        let productsArray = products.map((product) => {
            if (product.categoryId != categoryId) { // TODO Modificar el "!=" una vez que establezcamos los id de categorias
                product.categoryId = 1; // TODO eliminar una vez que definamos categorias
                return (
                    <Item
                        key={product.id}
                        id={Number(product.id)}
                        title={product.title}
                        model={product.model}
                        description={product.descripcion}
                        price={Number(product.price)}
                        imageURL={product.image}
                        categoryId={product.categoryId}
                    />
                );
            }
        });
        return productsArray;
    }
    async function serverRequest () {
        const serverRequest = fetch("https://webhooks.mongodb-realm.com/api/client/v2.0/app/app-api-horsc/service/HTTP-REQUESTS/incoming_webhook/get-protocol");
        let data = await serverRequest;
        data = await data.text();
        data = JSON.parse(data);

        setProducts(formatProducts(data));
    };
    

    useEffect(() => {
        serverRequest();
    }, []);

    return <div className="itemList">{products}</div>;
}