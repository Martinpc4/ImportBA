import React from 'react';
import { Link } from 'react-router-dom';

export default function Item(props) {
    return (
        <div className='row gy-2'>
            <div className='col-12'>
                <Link
                    to={`/Shop/${props.categoryId}/${props.id}`}
                    className='row text-decoration-none'
                >
                    <div className='col-12'>
                        <p className='text-dark m-0 fs-xs-6 fs-5 text-nowrap'>
                            {props.title}
                        </p>
                    </div>
                    <div className='col-12'>
                        <img
                            className='w-100'
                            src={String(props.imagesURL[0])}
                            alt=''
                        />
                    </div>
                </Link>
            </div>
            <div className='col-12'>
                <p className='m-0 fs-6 text-start text-nowrap'>
                    {props.memory !== 0
                        ? `${props.title} - ${props.memory}Gb`
                        : `${props.title}`}
                </p>
            </div>
            <div className='col-12'>
                <p className='m-0 fs-6 text-start'>{props.price},00 USD $</p>
            </div>
        </div>
    );
}
