import React from 'react';
import ItemList from './ItemList';

export default function Home() {
    return (
        <div className='categories-ctr'>
            <div className='categories-ctr__category'>
                <p className='categories-ctr__category__header'>Mac</p>
                <ItemList categoryId={1} vertical={false} />
            </div>
            <div className='categories-ctr__category'>
                <p className='categories-ctr__category__header'>iPad</p>
                <ItemList categoryId={2} vertical={false} />
            </div>
            <div className='categories-ctr__category'>
                <p className='categories-ctr__category__header'>iPhone</p>
                <ItemList categoryId={3} vertical={false} />
            </div>
            <div className='categories-ctr__category'>
                <p className='categories-ctr__category__header'>Accesorios</p>
                <ItemList categoryId={4} vertical={false} />
            </div>
        </div>
    );
}
