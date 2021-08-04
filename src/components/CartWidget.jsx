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

    function checkClickedState(e) {
        e.stopPropagation();
        if (clickedState === true) {
            setClickedState(false);
        } else {
            setClickedState(true);
        }
    }

    useEffect(() => {}, [Cart]);

    return (
        <>
            <i
                className='bi bi-cart fs-4 text-end'
                onClick={checkClickedState}
            ></i>
            {clickedState === true ? (
                <Link
                    to='/Cart'
                    className='user-select-auto text-decoration-none text-dark cart-widget w-25'
                >
                    <div className='container gy-1 bg-light border'>
                        <div className='row'>
                            <p className='m-0 fs-5 text-center'>Productos</p>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <CartList listModel={1} />
                            </div>
                        </div>
                        {getTotal() > 0 ? (
                            <div className='row align-items-center border-top py-2'>
                                <div className='col-6'>
                                    <div className='row'>
                                        <p className='text-start'>Total</p>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='row'>
                                        <p className='text-end price'>
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
