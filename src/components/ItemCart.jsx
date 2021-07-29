import React, { useState, useEffect, useContext } from "react";
import ItemCounter from "./ItemCounter";
// * Contexts
import CartContext from "./contexts/Cart";

export default function ItemCart({ productProperties, listModel }) {
    const [productAmount, setProductAmount] = useState(productProperties.amount);
    const {
        addToCart,
        removeFromCart,
        modifyProductAmount,
        isInCart,
        cleanCart,
        getProductAmount,
    } = useContext(CartContext);

    function applyAmountChangesToCart() {
        if (productAmount == 0) {
            removeFromCart(productProperties.product);
        }
        else {
            let newProductAmount = productAmount - getProductAmount(productProperties.product);
            modifyProductAmount(productProperties.product, newProductAmount);
        }
    }

    let fontSizeM2 = {fontSize: 13};

    if (listModel === 1) {
        return(
            <div className="row align-items-center">
                <div className="col-2 px-2">
                    <img
                        className="h-100 w-100"
                        src={String(productProperties.product.imagesURL[0])}
                        alt=""
                    />
                </div>
                <div className="col-7 px-2">
                    <div className="row">
                        <p className="m-0" style={fontSizeM2}>
                            {productProperties.product.title} - {productProperties.product.memory} - {productProperties.product.color}
                        </p>
                    </div>
                </div>
                <div className="col-3 px-2">
                    <div className="row">
                        <p className="m-0 text-end" style={fontSizeM2}>
                            {String(productProperties.product.price * productProperties.amount)} USD$
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    else if (listModel === 2) {
        return (
            <div className="row align-items-center">
                <div className="col-2">
                    <img
                        className="h-75 w-75"
                        src={String(productProperties.product.imagesURL[0])}
                        alt=""
                    />
                </div>
                <div className="col-6">
                    <div className="row">
                        <p className="m-0 fs-5">
                            {productProperties.product.title} - {productProperties.product.memory} - {productProperties.product.color}
                        </p>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row">
                        <p className="price m-0 fs-6">
                            {String(productProperties.product.price * productAmount)},00 USD$
                        </p>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row mb-2">
                        <ItemCounter
                            itemAmount={productAmount}
                            itemAmountFunction={setProductAmount}
                            applyChangesFunction={applyAmountChangesToCart}
                            cartItemAmount={getProductAmount(productProperties.product)}
                            isApplyChanges={true}
                        />
                    </div>
                </div>
            </div>
        );
    }

}
