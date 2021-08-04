// * Libraries
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// * Components
import CartList from './CartList';
// * Context
import CartContext from './contexts/Cart';

export default function Cart() {
    // context
    const { getTotal, checkCartForStock } = useContext(CartContext);
    // react-router history
    const history = useHistory();

    return (
        <div className='container'>
            <div className='row h-100'>
                <div className='py-2 col-12 d-flex flex-column justify-content-between'>
                    <div className='row mb-5 gy-2 h-100 align-items-center align-content-start'>
                        <CartList listModel={2} />
                    </div>
                    {getTotal() > 0 ? (
                        <div className='row align-items-center'>
                            <div className='col-6'>
                                <div className='row'>
                                    <p className='m-0 text-start fs-5'>Total</p>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='row'>
                                    <p className='m-0 text-end price fs-5'>
                                        {getTotal()} USD$
                                    </p>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div className='row'>
                                    <button
                                        onClick={async () => {
                                            if (
                                                (await checkCartForStock()) ===
                                                true
                                            ) {
                                                history.push('/Checkout');
                                            }
                                        }}
                                        className='btn btn-primary w-100'
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
