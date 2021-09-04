// ! Import
// * Libraries
import React, { useState, useEffect } from 'react';
// * Components
import Item from './Item';
// * Database
import db from '../firebase/firebase';
// Types
import { collection, getDocs, query } from 'firebase/firestore';
// * Types
import {
    Query,
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentData,
} from '@firebase/firestore';

// ! Home React Function Component
const Home: React.FC = () => {
    const [products, setProducts] =
        useState<QueryDocumentSnapshot<DocumentData>[]>();

    useEffect(() => {
        serverRequest();
    }, []);

    async function serverRequest(): Promise<void> {
        const itemsRef: Query = query(collection(db, 'items'));
        const documents: QuerySnapshot = await getDocs(itemsRef);
        let productsData: QueryDocumentSnapshot<DocumentData>[] = [];
        documents.forEach((doc) => {
            productsData = [...productsData, doc];
        });
        setProducts(productsData);
    }

    function getProduct(productId: string): JSX.Element {
        if (products != undefined) {
            let productData: any = {};
            products.forEach((productProperties) => {
                if (productProperties.id === productId) {
                    productData = productProperties.data();
                    productData.id = productProperties.id;
                }
            });
            return (
                <Item
                    id={productData.id}
                    title={productData.title}
                    memory={productData.memory}
                    price={productData.price}
                    imagesURL={productData.imagesURL}
                    categoryId={productData.categoryId}
                />
            );
        }
        return <h2>Producto no encontrado</h2>;
    }

    return (
        <div className='container py-5'>
            <div className='row'>
                <div className='col-12'>
                    <p className='m-0 text-center fs-2'>Latest Products</p>
                </div>
            </div>
            <div className='row align-items-center gy-5 gx-5'>
                <div className='col-6'>
                    <div className='row my-4'>
                        <div className='col'>
                            <p className='m-0 fs-4 text-center'>MacBook Air</p>
                        </div>
                    </div>
                    <div className='row align-items-center gx-5'>
                        <div className='col'>
                            <div className='row align-content-center justify-content-start'>
                                <img
                                    className='w-100'
                                    src='https://www.apple.com/v/macbook-air/k/images/overview/machine_learning__d8u6dxf5xawm_large_2x.png'
                                    alt=''
                                />
                            </div>
                        </div>
                        <div className='col-5'>
                            {products !== undefined &&
                                getProduct('FMwgFWKOZvabxAcUBrwN')}
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row my-4'>
                        <div className='col'>
                            <p className='m-0 fs-4 text-center'>MacBook Pro</p>
                        </div>
                    </div>
                    <div className='row align-items-center gx-5'>
                        <div className='col-5'>
                            {products !== undefined &&
                                getProduct('Y4X0vH47lSUAaBunz9i3')}
                        </div>
                        <div className='col'>
                            <div className='row align-content-center justify-content-end'>
                                <img
                                    className='w-100'
                                    src='https://www.apple.com/v/macbook-pro-13/h/images/overview/macos__3zitq287xeae_large_2x.png'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row my-4'>
                        <div className='col'>
                            <p className='m-0 fs-4 text-center'>
                                iPhone 12 Pro
                            </p>
                        </div>
                    </div>
                    <div className='row align-items-center gx-5'>
                        <div className='col'>
                            <img
                                className='w-100'
                                src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-pro-magsafe-202104?wid=1380&hei=904&fmt=jpeg&qlt=80&.v=1617147706000'
                                alt=''
                            />
                        </div>
                        <div className='col-4'>
                            {products !== undefined &&
                                getProduct('DTeJz6yPbnVIRGVdNyTn')}
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row my-4'>
                        <div className='col'>
                            <p className='m-0 fs-4 text-center'>iPhone 12</p>
                        </div>
                    </div>
                    <div className='row align-items-center gx-5'>
                        <div className='col-4'>
                            {products !== undefined &&
                                getProduct('QkdhyXNJuaoH9Ca7P67V')}
                        </div>
                        <div className='col'>
                            <img
                                className='w-100'
                                src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-magsafe-202104?wid=1680&hei=800&fmt=jpeg&qlt=80&.v=1617147705000'
                                alt=''
                            />
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row my-4'>
                        <div className='col'>
                            <p className='m-0 fs-4 text-center'>iPad Pro</p>
                        </div>
                    </div>
                    <div className='row align-items-center gx-5'>
                        <div className='col'>
                            <img
                                className='w-100'
                                src='https://www.apple.com/v/ipad-pro/af/images/shared/ipad_trade_in__ggq1dqvyb56y_large_2x.png'
                                alt=''
                            />
                        </div>
                        <div className='col-5'>
                            {products !== undefined &&
                                getProduct('gUZX307PQ4an45aM7yCO')}
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row my-4'>
                        <div className='col'>
                            <p className='m-0 fs-4 text-center'>iPad Air</p>
                        </div>
                    </div>
                    <div className='row align-items-center gx-5'>
                        <div className='col-5'>
                            {products !== undefined &&
                                getProduct('rloc7hK4fujIUiEvaURW')}
                        </div>
                        <div className='col'>
                            <img
                                className='w-100'
                                src='https://www.apple.com/v/ipad/shared/why-ipad/h/images/why-ipad/markup/shapes__x3ypvrhjmlei_large_2x.jpg'
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
