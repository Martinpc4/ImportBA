import React, { useState, useEffect } from 'react';
import Item from './Item';

import { db } from '../firebase/firebase';
import { product } from 'prelude-ls';

export default function Home() {
    const [products, setProducts] = useState();

    useEffect(() => {
        const itemCollection = db.collection('items');
        itemCollection
            .get()
            .then((data) => {
                let products = [];
                data.forEach((doc) => {
                    products = [...products, doc];
                });
                setProducts(products);
            })
            .catch((err) => {
                throw new Error(`Error de obtención de datos de bd:\n\n${err}`);
            });
    }, []);

    function getProduct(productId) {
        let productData = {};
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
                colors={productData.colors}
                description={productData.description}
                price={productData.price}
                imagesURL={productData.imagesURL}
                categoryId={productData.categoryId}
            />
        );
    }

    return (
        <div className='container py-5'>
            <div className="row">
                <div className="col-12">
                    <p className="m-0 text-center fs-2">Latest Products</p>
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
                            <img className="w-100" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-pro-magsafe-202104?wid=1380&hei=904&fmt=jpeg&qlt=80&.v=1617147706000" alt="" />
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
                            <p className='m-0 fs-4 text-center'>
                                iPhone 12
                            </p>
                        </div>
                    </div>
                    <div className='row align-items-center gx-5'>
                        <div className='col-4'>
                            {products !== undefined &&
                                getProduct('QkdhyXNJuaoH9Ca7P67V')}
                        </div>
                        <div className='col'>
                                <img className="w-100" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-magsafe-202104?wid=1680&hei=800&fmt=jpeg&qlt=80&.v=1617147705000" alt="" />
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
}
