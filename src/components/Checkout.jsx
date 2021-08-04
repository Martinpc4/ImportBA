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
        impuestoPais,
        Cart,
        checkCartForStock,
    } = useContext(CartContext);

    // states
    const [userData, setuserData] = useState({
        userEmail: '',
        userCellphone: '',
        userName: '',
        userLastName: '',
        userAddress: '',
        userZipcode: '',
        userProvince: '',
        userTown: '',
        userTyC: false,
    });

    useEffect(() => {}, [userData]);

    function isValid() {
        if (
            userData.userEmail !== '' &&
            userData.userCellphone !== '' &&
            userData.userName !== '' &&
            userData.userLastName !== '' &&
            userData.userAddress !== '' &&
            userData.userZipcode !== '' &&
            userData.userProvince !== '' &&
            userData.userTown !== '' &&
            userData.userTyC === true
        ) {
            return true;
        }
        return false;
    }

    function senduserDataToDB() {
        db.collection('orders')
            .doc()
            .set({
                buyer: {
                    name: `${userData.userName} ${userData.userLastName}`,
                    phone: userData.userCellphone,
                    email: userData.userEmail,
                },
                date: new Date(),
                total: Number(
                    (
                        getTotal() +
                        getTotal(1) / dolar +
                        getTotal(2) / dolar
                    ).toFixed(2)
                ),
                items: JSON.stringify(Cart),
            });
    }

    return (
        <div className='container'>
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
                                            let newuserData = userData;
                                            newuserData.userName =
                                                e.target.value;
                                            setuserData(newuserData);
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
                                            let newuserData = userData;
                                            newuserData.userLastName =
                                                e.target.value;
                                            setuserData(newuserData);
                                        }}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputEmail'
                                        className='form-label'
                                    >
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='inputEmail'
                                        onChange={(e) => {
                                            let newuserData = userData;
                                            newuserData.userEmail =
                                                e.target.value;
                                            setuserData(newuserData);
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
                                            let newuserData = userData;
                                            newuserData.userCellphone =
                                                e.target.value;
                                            setuserData(newuserData);
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
                                            let newuserData = userData;
                                            newuserData.userAddress =
                                                e.target.value;
                                            setuserData(newuserData);
                                        }}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label
                                        htmlFor='inputCity'
                                        className='form-label'
                                    >
                                        Provincia
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='inputCity'
                                        onChange={(e) => {
                                            let newuserData = userData;
                                            newuserData.userProvince =
                                                e.target.value;
                                            setuserData(newuserData);
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
                                            let newuserData = userData;
                                            newuserData.userTown =
                                                e.target.value;
                                            setuserData(newuserData);
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
                                            let newuserData = userData;
                                            newuserData.userZipcode =
                                                e.target.value;
                                            setuserData(newuserData);
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
                                                let newuserData = userData;
                                                newuserData.userTyC === true
                                                    ? (newuserData.userTyC = false)
                                                    : (newuserData.userTyC = true);
                                                setuserData(newuserData);
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
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p className='text-start fs-6'>{`Impuesto Pais (${impuestoPais}%)`}</p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='text-end fs-6'>{`${getTotal(
                                                2
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
                                                    getTotal(1) / dolar +
                                                    getTotal(2) / dolar
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
                                                    getTotal(1) +
                                                    getTotal(2)
                                                ).toFixed(2)}{' '}
                                                ARS$
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary w-100'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            if (
                                                isValid() === true &&
                                                (await checkCartForStock()) ===
                                                    true
                                            ) {
                                                senduserDataToDB();
                                            }
                                        }}
                                    >
                                        Proceder a Pagar
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
