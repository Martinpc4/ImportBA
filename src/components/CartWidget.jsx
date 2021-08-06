// * Libraries
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// * Component
import CartList from './CartList';
// * Contexts
import CartContext from './contexts/Cart';

export default function CartWidget() {
    const [clickedState, setClickedState] = useState(false);
    const { Cart, getTotal } = useContext(CartContext);

    function modifyClickedState(e) {
        e.stopPropagation();
        if (clickedState === true) {
            setClickedState(false);
        } else {
            setClickedState(true);
        }
    }

    useEffect(() => {}, [Cart]);

    function getCartItemAmount() {
        let counter = 0;
        if (Cart.length > 0) {
            Cart.forEach((product) => {
                counter = counter + product.amount;
            });
        }
        return counter;
    }

    return (
        <>
            <div className='position-relative'>
                <i
                    className='bi bi-cart fs-4 d-flex flex-row align-items-center justify-content-end'
                    onClick={modifyClickedState}
                />
                {getCartItemAmount() > 0 ? (
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                        {getCartItemAmount() <= 99
                            ? getCartItemAmount()
                            : '99+'}
                        <span className='visually-hidden'>unread messages</span>
                    </span>
                ) : null}
            </div>
            {clickedState === true ? (
                <Link
                    to='/Cart'
                    className='user-select-auto text-decoration-none text-dark cart-widget w-25'
                >
                    <div className='container gy-1 bg-light border py-2'>
                        <div className='row'>
                            <p className='m-0 fs-5 text-center'>Productos</p>
                        </div>
                        <div className='row py-3'>
                            <div className='col-12'>
                                <CartList listModel={1} />
                            </div>
                        </div>
                        {getTotal() > 0 ? (
                            <div className='row align-items-center border-top py-2'>
                                <div className='col-6'>
                                    <div className='row'>
                                        <p className='m-0 text-start'>Total</p>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='row'>
                                        <p className='m-0 text-end price'>
                                            {getTotal()} USD$
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </Link>
            ) : null}
        </>
    );
}
