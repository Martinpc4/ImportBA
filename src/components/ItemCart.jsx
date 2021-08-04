import React, { useState, useContext, useEffect } from 'react';
import ItemCounter from './ItemCounter';
// * Contexts
import CartContext from './contexts/Cart';

export default function ItemCart({ productProperties, listModel }) {
    const [productAmount, setProductAmount] = useState(
        productProperties.amount
    );
    const [stockState, setStockState] = useState(true);
    const {
        removeFromCart,
        modifyProductAmount,
        getProductAmount,
        checkProductForStock,
    } = useContext(CartContext);

    useEffect(() => {
        (async function () {
            if (
                (await checkProductForStock(
                    productProperties.product,
                    productAmount
                )) === false
            ) {
                setStockState(false);
            } else {
                setStockState(true);
            }
        })();
    }, [productAmount]);

    function applyAmountChangesToCart() {
        if (Number(productAmount) === 0) {
            removeFromCart(productProperties.product);
        } else {
            let newProductAmount =
                productAmount - getProductAmount(productProperties.product);
            modifyProductAmount(productProperties.product, newProductAmount);
        }
    }

    let fontSizeM2 = { fontSize: 13 };

    if (listModel === 1) {
        // for the CartWidget Component
        return (
            <div
                key={`${productProperties.id}-${productProperties.color}-1`}
                className='row align-items-center'
            >
                <div className='col-2 px-2'>
                    <img
                        className='h-100 w-100'
                        src={String(productProperties.product.imagesURL[0])}
                        alt=''
                    />
                </div>
                <div className='col-6 px-2'>
                    <div className='row'>
                        <p className='m-0' style={fontSizeM2}>
                            {productProperties.product.title}
                        </p>
                    </div>
                </div>
                <div className='col-4 px-2'>
                    <div className='row'>
                        <p className='m-0 text-end' style={fontSizeM2}>
                            {String(
                                productProperties.product.price *
                                    productProperties.amount
                            )}{' '}
                            USD$
                        </p>
                    </div>
                </div>
            </div>
        );
    } else if (listModel === 2) {
        // for the Cart Component
        return (
            <div className='col-12'>
                <div className='row align-items-center gx-1 border-bottom border-top px-3'>
                    <div className='col-2'>
                        <img
                            className='w-50'
                            src={String(productProperties.product.imagesURL[0])}
                            alt=''
                        />
                    </div>
                    <div className='col-5'>
                        <div className='row'>
                            <p className='m-0 fs-6'>
                                {productProperties.product.title} -{' '}
                                {productProperties.product.memory}Gb -{' '}
                                {productProperties.product.color}
                            </p>
                        </div>
                    </div>
                    <div className='col-2'>
                        <div className='row'>
                            <p className='price m-0 fs-6'>
                                {String(
                                    productProperties.product.price *
                                        productAmount
                                )}
                                ,00 USD$
                            </p>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='container'>
                            <div className='row align-items-center'>
                                {stockState === false && (
                                    <div className='col m-0 p-0 d-flex flex-row justify-content-end'>
                                        <i
                                            className='fs-5 me-2 text-danger bi bi-exclamation-diamond'
                                            data-bs-toggle='tooltip'
                                            title='Insuficiente Stock'
                                        ></i>
                                    </div>
                                )}
                                <div className='col d-flex flex-row justify-content-end'>
                                    <ItemCounter
                                        itemAmount={productAmount}
                                        itemAmountFunction={setProductAmount}
                                        applyChangesFunction={
                                            applyAmountChangesToCart
                                        }
                                        cartItemAmount={getProductAmount(
                                            productProperties.product
                                        )}
                                        isApplyChanges={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
