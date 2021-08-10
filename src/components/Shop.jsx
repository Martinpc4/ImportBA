import React from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

export default function Shop() {
    const { CategoryId } = useParams();

    return (
        <div className='container m-5'>
            <div className='row'>
                <ItemList categoryId={CategoryId} />
            </div>
        </div>
    );
}
