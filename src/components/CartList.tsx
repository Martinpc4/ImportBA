// ! Imports
// * Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// * Components
import ItemCart from './ItemCart';
// * Contexts
import CartContext from './contexts/Cart';
// * Types
import { ProductInterface } from '../interfaces/ComponentsInterfaces';

// ! CartList React Function Component
interface CartListProps {
    listModel: number;
}
const CartList: React.FC<CartListProps> = ({ listModel }: CartListProps) => {
    const [products, setProducts] = useState<JSX.Element[]>([]);
    const { Cart } = useContext(CartContext);

    function formatProductData(): void {
        let itemCartList: JSX.Element[] = [];
        Cart.forEach((productProperties: ProductInterface): void => {
            itemCartList.push(
                <ItemCart
                    key={`${productProperties.product.id}-${productProperties.product.color}`}
                    productProperties={productProperties}
                    listModel={listModel}
                />
            );
        });
        setProducts(itemCartList);
    }

    useEffect((): void => {
        if (Cart.length > 0) {
            formatProductData();
        }
    }, [Cart]);

    if (Cart.length > 0) {
        return <>{products}</>;
    } else {
        return (
            <div className='container h-100'>
                <div className='row h-100 align-items-center'>
                    <Link to='/' className='text-decoration-none text-muted'>
                        <p
                            className={`text-center mx-0 my-3 ${
                                listModel === 1 ? 'fs-6' : 'fs-4'
                            }`}
                        >
                            Todavia no hay productos!
                        </p>
                    </Link>
                </div>
            </div>
        );
    }
};

export default CartList;
