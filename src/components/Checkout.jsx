// * Libraries
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.js";
// * Components
import CartList from "./CartList";
// * Context
import CartContext from "./contexts/Cart";

export default function Checkout() {
    // context
    const { getTotal, getItemsList, iva, dolar, impuestoPais, Cart } =
        useContext(CartContext);

    // states
    const [data, setData] = useState({
        userEmail: "",
        userCellphone: "",
        userName: "",
        userLastName: "",
        userAddress: "",
        userZipcode: "",
        userProvince: "",
        userTown: "",
        userTyC: false,
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    function isValid() {
        if (
            data.userEmail != "" &&
            data.userCellphone != "" &&
            data.userName != "" &&
            data.userLastName != "" &&
            data.userAddress != "" &&
            data.userZipcode != "" &&
            data.userProvince != "" &&
            data.userTown != "" &&
            data.userTyC === true
        ) {
            return true;
        }
        return false;
    }

    function sendDataToDB() {
        db.collection("orders")
            .doc()
            .set({
                buyer: {
                    name: `${data.userName} ${data.userLastName}`,
                    phone: data.userCellphone,
                    email: data.userEmail,
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
        <div className="container">
            <div className="row gx-5">
                <div className="col-12">
                    <form class="row g-5">
                        <div className="col-8">
                            <div className="row gy-3">
                                <div class="col-md-6">
                                    <label for="inputName" class="form-label">
                                        Nombre
                                    </label>
                                    <input
                                        type="name"
                                        class="form-control"
                                        id="inputName"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userName = e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label
                                        for="inputLastName"
                                        class="form-label"
                                    >
                                        Apellido
                                    </label>
                                    <input
                                        type="lastname"
                                        class="form-control"
                                        id="inputLastName"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userLastName =
                                                e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail" class="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="inputEmail"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userEmail = e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label
                                        for="inputCellphone"
                                        class="form-label"
                                    >
                                        Telefono
                                    </label>
                                    <input
                                        type="tel"
                                        class="form-control"
                                        id="inputCellphone"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userCellphone =
                                                e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-12">
                                    <label
                                        for="inputAddress"
                                        class="form-label"
                                    >
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputAddress"
                                        placeholder="1234 Calle Principal"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userAddress =
                                                e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCity" class="form-label">
                                        Provincia
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputCity"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userProvince =
                                                e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputTown" class="form-label">
                                        Barrio
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputTown"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userTown = e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-md-2">
                                    <label for="inputZip" class="form-label">
                                        Zip
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputZip"
                                        onChange={(e) => {
                                            let newData = data;
                                            newData.userZipcode =
                                                e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="inputTyC"
                                            onChange={(e) => {
                                                let newData = data;
                                                newData.userTyC === true
                                                    ? (newData.userTyC = false)
                                                    : (newData.userTyC = true);
                                                setData(newData);
                                            }}
                                        />
                                        <label
                                            class="form-check-label"
                                            for="inputTyC"
                                        >
                                            Acepto los Terminos y Condiciones
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-12">
                                    <p className="fs-5 text-center">Carrito</p>
                                </div>
                            </div>
                            <div className="row h-auto">
                                <div className="col-12">{getItemsList()}</div>
                            </div>
                            <div className="row border-top py-2">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="text-start">{`IVA (${iva}%)`}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="text-end">{`${getTotal(
                                                1
                                            ).toFixed(2)} ARS$`}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="text-start fs-6">{`Impuesto Pais (${impuestoPais}%)`}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="text-end fs-6">{`${getTotal(
                                                2
                                            ).toFixed(2)} ARS$`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-top py-2">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="text-start">
                                                {"Total(USD)"}
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <p className="text-end price">
                                                {(
                                                    getTotal() +
                                                    getTotal(1) / dolar +
                                                    getTotal(2) / dolar
                                                ).toFixed(2)}{" "}
                                                USD$
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="text-start">
                                                {"Total(ARS)"}
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <p className="text-end price">
                                                {(
                                                    getTotal() * dolar +
                                                    getTotal(1) +
                                                    getTotal(2)
                                                ).toFixed(2)}{" "}
                                                ARS$
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        class="btn btn-primary w-100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (isValid() === true) {
                                                sendDataToDB();
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
