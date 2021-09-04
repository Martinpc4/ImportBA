// ! Imports
// * Libraries
import React, { MouseEvent } from 'react';

// ! ItemCounter React Function Component
interface ItemCounterProps {
    itemAmount: number;
    itemAmountFunction: React.Dispatch<React.SetStateAction<number>>;
    applyChangesFunction?: () => void;
    cartItemAmount?: number;
    isApplyChanges?: boolean;
}
const itemCounter: React.FC<ItemCounterProps> = ({
    itemAmount,
    itemAmountFunction,
    applyChangesFunction,
    cartItemAmount,
    isApplyChanges,
}: ItemCounterProps) => {
    return (
        <div className='itemCounter'>
            <div className='itemCounter__counter'>
                <p>{itemAmount}</p>
            </div>
            <div className='itemCounter__plus-btn'>
                <i
                    className='bi bi-plus-lg'
                    onClick={(e: MouseEvent) => {
                        itemAmountFunction(itemAmount + 1);
                    }}
                ></i>
            </div>
            <div className='itemCounter__substr-btn'>
                <i
                    className='bi bi-dash-lg'
                    onClick={(e: MouseEvent) => {
                        if (itemAmount > 0) {
                            itemAmountFunction(itemAmount - 1);
                        }
                    }}
                ></i>
            </div>
            {Number(itemAmount) !== Number(cartItemAmount) &&
            isApplyChanges &&
            applyChangesFunction !== undefined ? (
                <div className='itemCounter__confirm-btn'>
                    <i
                        className='bi bi-check'
                        onClick={(e: MouseEvent) => {
                            applyChangesFunction();
                        }}
                    ></i>
                </div>
            ) : null}
        </div>
    );
};

export default itemCounter;
