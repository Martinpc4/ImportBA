// ! Imports
// * Libraries
import React from 'react';
import { useParams } from 'react-router-dom';
// * Components
import ItemList from './ItemList';

// ! Shop React Function Component
interface ShopParams {
    CategoryId: string;
}
const Shop: React.FC = () => {
    const { CategoryId } = useParams<ShopParams>();

    return (
        <div className='container m-5'>
            <div className='row'>
                <ItemList categoryId={Number(CategoryId)} />
            </div>
        </div>
    );
};

export default Shop;
