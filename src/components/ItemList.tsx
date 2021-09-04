// ! Imports
// * Libraries
import React, { useEffect, useState } from 'react';
// * Components
import Item from './Item';

// * Database
import db from './../firebase/firebase';
import { getDocs, query, where, collection } from 'firebase/firestore';
// Types
import { DocumentData, Query, QuerySnapshot } from '@firebase/firestore';

// ! ItemList React Function Component
interface ItemListProps {
    categoryId: number;
}
const ItemList: React.FC<ItemListProps> = ({ categoryId }: ItemListProps) => {
    const [products, setProducts] = useState<JSX.Element[]>([]);

    function formatProduct(data: DocumentData) {
        let product = data.data();
        product.id = data.id;

        return (
            <div
                key={`${product.id}`}
                className='col-xs-6 col-sm-5 col-lg-3 m-sm-3 m-md-3 border'
            >
                <Item
                    id={product.id}
                    title={product.title}
                    memory={product.memory}
                    price={product.price}
                    imagesURL={product.imagesURL}
                    categoryId={product.categoryId}
                />
            </div>
        );
    }

    async function serverRequest(): Promise<void> {
        const categoryQuery: Query = query(
            collection(db, 'items'),
            where('categoryId', '==', Number(categoryId))
        );
        const documents: QuerySnapshot = await getDocs(categoryQuery);
        let products: JSX.Element[] = [];
        documents.forEach((doc) => {
            products = [...products, formatProduct(doc)];
        });
        setProducts(products);
    }

    useEffect(() => {
        serverRequest();
    }, [categoryId]);

    return (
        <div className='container px-5 px-sm-0'>
            <div className='row align-items-center justify-content-center px-5 px-sm-0 gy-5 gy-sm-0'>
                {products}
            </div>
        </div>
    );
};

export default ItemList;
