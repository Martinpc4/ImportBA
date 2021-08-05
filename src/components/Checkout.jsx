// * Libraries
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebase.js';
// * Context
import CartContext from './contexts/Cart';

export default function Checkout() {
    // context
    const {
        getTotal,
        getItemsList,
        iva,
        dolar,
        Cart,
        checkCartForStock,
        cleanCart,
    } = useContext(CartContext);

    // states
    const [userData, setUserData] = useState({});
    const [validDataState, setValidDataState] = useState(false); // false: not valid, true: valid
    const [purchaseState, setpurchaseState] = useState({
        state: false,
        purchaseId: undefined,
    });

    useEffect(() => {
        if (Object.entries(userData).length !== 0) {
            let flagVar = true;
            let entriesAmount = 0;
            let entries = Object.entries(userData);
            entries.forEach((keyValuesPairs) => {
                if (
                    keyValuesPairs[1] === undefined ||
                    keyValuesPairs[1] === ''
                ) {
                    flagVar = false;
                }
                entriesAmount++;
            });
            if (
                entriesAmount === 10 &&
                flagVar === true &&
                userData.userTyC === true &&
                Cart.length > 0
            ) {
                setValidDataState(true);
            } else {
                setValidDataState(false);
            }
        } else {
            setValidDataState(false);
        }
    }, [userData, validDataState, purchaseState]);

    function senduserDataToDB() {
        // format the products from the cart
        let productsArray = [];
        Cart.forEach((productProperties) => {
            productsArray = [
                ...productsArray,
                {
                    // !(added the color and amount property bc it may be relevant to the ecomerce analitics)
                    id: productProperties.product.id,
                    title: productProperties.product.title,
                    price: productProperties.product.price,
                    color: productProperties.product.color,
                    amount: productProperties.amount,
                },
            ];
        });
        // send the order to the db
        db.collection('orders')
            .add({
                buyer: {
                    name: `${userData.userName} ${userData.userLastName}`,
                    phone: userData.userCellphone,
                    email: userData.userEmail1,
                },
                date: new Date(),
                total: Number(
                    (
                        getTotal() +
                        getTotal(1) / dolar
                    ).toFixed(2)
                ),
                items: productsArray,
            })
            .then((docRef) => {
                cleanCart();
                setpurchaseState({
                    state: true,
                    purchaseId: docRef.id,
                });
            })
            .catch((err) => {
                throw new Error('Error agregado el producto a la db');
            });
    }

    return (
        <div className='container'>
            {purchaseState.state === true ? (
                <div className='row'>
                    <div className='col-12'>
                        <div class='alert alert-success' role='alert'>
                            <p className='m-0 fs-6'>
                                Compra realizada correctamente.
                            </p>
                            <p className='ps-2 m-0 fs-6'>
                                id de compra: {purchaseState.purchaseId}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className='row gx-5'>
                <div className='col-12'>
                    <form className='row g-5'>
                        <div className='col-8'>
                            <div className='row gy-3'>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputName'
                                        className='form-label'
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        type='name'
                                        className='form-control'
                                        id='inputName'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userName: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputLastName'
                                        className='form-label'
                                    >
                                        Apellido
                                    </label>
                                    <input
                                        type='lastname'
                                        className='form-control'
                                        id='inputLastName'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userLastName: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputEmail1'
                                        className='form-label'
                                    >
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='inputEmail1'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userEmail1: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputEmail2'
                                        className='form-label'
                                    >
                                        Confirmar Email
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='inputEmail2'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userEmail2: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputCellphone'
                                        className='form-label'
                                    >
                                        Telefono
                                    </label>
                                    <input
                                        type='tel'
                                        className='form-control'
                                        id='inputCellphone'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userCellphone: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label
                                        htmlFor='inputAddress'
                                        className='form-label'
                                    >
                                        Dirección
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='inputAddress'
                                        placeholder='1234 Calle Principal'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userAddress: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputProvince'
                                        className='form-label'
                                    >
                                        Provincia
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='inputProvince'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userProvince: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <label
                                        htmlFor='inputTown'
                                        className='form-label'
                                    >
                                        Barrio
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='inputTown'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userTown: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-md-2'>
                                    <label
                                        htmlFor='inputZip'
                                        className='form-label'
                                    >
                                        Zip
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='inputZip'
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                userZipcode: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            id='inputTyC'
                                            onChange={(e) => {
                                                userData.userTyC === true
                                                    ? setUserData({
                                                          ...userData,
                                                          userTyC: false,
                                                      })
                                                    : setUserData({
                                                          ...userData,
                                                          userTyC: true,
                                                      });
                                            }}
                                        />
                                        <label
                                            className='form-check-label'
                                            htmlFor='inputTyC'
                                        >
                                            Acepto los Terminos y Condiciones
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='fs-5 text-center'>Carrito</p>
                                </div>
                            </div>
                            <div className='row h-auto'>
                                <div className='col-12'>{getItemsList()}</div>
                            </div>
                            <div className='row border-top py-2'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p className='text-start'>{`IVA (${iva}%)`}</p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='text-end'>{`${getTotal(
                                                1
                                            ).toFixed(2)} ARS$`}</p>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <div className='row border-top py-2'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p className='text-start'>
                                                {'Total(USD)'}
                                            </p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='text-end price'>
                                                {(
                                                    getTotal() +
                                                    getTotal(1) / dolar
                                                ).toFixed(2)}{' '}
                                                USD$
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p className='text-start'>
                                                {'Total(ARS)'}
                                            </p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='text-end price'>
                                                {(
                                                    getTotal() * dolar +
                                                    getTotal(1)
                                                ).toFixed(2)}{' '}
                                                ARS$
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <button
                                        type='submit'
                                        className={`btn btn-primary w-100 ${
                                            validDataState === false
                                                ? 'disabled'
                                                : null
                                        }`}
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            if (
                                                (await checkCartForStock()) ===
                                                true
                                            ) {
                                                senduserDataToDB();
                                            }
                                        }}
                                    >
                                        Proceder al pago
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
