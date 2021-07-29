import React from "react";

export default function itemCounter({
    itemAmount,
    itemAmountFunction,
    applyChangesFunction,
    cartItemAmount,
    isApplyChanges
}) {
    return (
        <div className="itemCounter">
            <div className="itemCounter__counter">
                <p>{itemAmount}</p>
            </div>
            <div className="itemCounter__plus-btn">
                <i
                    className="bi bi-plus-lg"
                    onClick={() => {
                        itemAmountFunction(itemAmount + 1);
                    }}
                ></i>
            </div>
            <div className="itemCounter__substr-btn">
                <i
                    className="bi bi-dash-lg"
                    onClick={
                        itemAmount > 0
                            ? () => {
                                  itemAmountFunction(itemAmount - 1);
                              }
                            : null
                    }
                ></i>
            </div>
            {console.log(cartItemAmount)}
            {(itemAmount != cartItemAmount) && (isApplyChanges === true) ? (
                <div className="itemCounter__confirm-btn">
                    <i
                        className="bi bi-check"
                        onClick={() => {
                            applyChangesFunction()
                        }}
                    ></i>
                </div>
            ) : null}
        </div>
    );
}
