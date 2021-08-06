// * Libraries
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { db } from '../firebase/firebase.js';
import Select from 'react-select';
// * Components
import ItemCounter from './ItemCounter';
// * Context
import CartContext from './contexts/Cart';

let colorOptions = [];

export default function ItemDetail(props) {
    // parameters
    const { CategoryId, ItemId } = useParams();
    // router
    const history = useHistory();
    // context
    let { addToCart } = useContext(CartContext);
    // states
    const [product, setProduct] = useState({});
    const [productColor, setProductColor] = useState('');
    const [amount, setAmount] = useState(0);

    function formatProduct(data) {
        let product = data.data();
        product.id = data.id;

        // Set Color Options w/ react-select
        let colorCounter = 0;
        colorOptions = [];
        product.colors.forEach((color) => {
            let availableStock = false; // stock control
            if (product.stock[colorCounter] === 0) {
                availableStock = true;
            }
            colorOptions.push({
                value: String(color),
                label: String(color),
                isDisabled: availableStock,
            });
            colorCounter++;
        });

        let imagesBootstrapComponents = [];
        let imagesCounter = 0
        product.imagesURL.forEach((imageURL) => {
            imagesCounter++;
            imagesBootstrapComponents.push(
                <div
                    key={`${product.id}-${imagesCounter}-${imageURL}`}
                    className={
                        imageURL === product.imagesURL[0]
                            ? 'carousel-item active h-100 px-5'
                            : 'carousel-item h-100 px-5'
                    }
                    data-bs-interval='10000'
                >
                    <img
                        src={String(imageURL)}
                        className='d-block h-100 w-100'
                        alt='...'
                    />
                </div>
            );
        });
        let carouselIndicators = generateCarouselIndicators(product.imagesURL);

        return {
            id: data.id,
            title: product.title,
            price: product.price,
            description: product.description,
            memory: product.memory,
            imagesURL: product.imagesURL,
            colors: product.colors,
            imagesBootstrapComponents,
            carouselIndicators,
        };
    }

    function fetchData() {
        const itemCollection = db.collection('items');
        itemCollection
            .doc(ItemId)
            .get()
            .then((data) => {
                if (data.exists) {
                    setProduct(formatProduct(data));
                } else {
                    history.push('/Error/1');
                }
            })
            .catch((err) => {
                throw new Error(`Error de obtención de datos de bd: ${err}`);
            });
    }

    useEffect(() => {
        fetchData();
    }, [ItemId, CategoryId]);

    function generateCarouselIndicators(imagesURL) {
        let buttons = [];
        for (let i = 0; i < imagesURL.length; i++) {
            buttons.push(
                <button
                    key={`${imagesURL}-button-${i}`}
                    type='button'
                    data-bs-target='#productCarousel'
                    data-bs-slide-to={i}
                    className='active'
                    aria-current='true'
                    aria-label={`Silde ${i + 1}`}
                ></button>
            );
        }
        return buttons;
    }

    return (
        <div className='mb-5 container d-flex flex-column align-items-between'>
            <div className='row gx-5 mb-4 justify-content-center align-items-center h-75'>
                <div className='col-5 h-100'>
                    <div className='row h-100'>
                        <div
                            id='productCarousel'
                            className='carousel carousel-dark slide h-100'
                            data-bs-ride='carousel'
                        >
                            <div className='carousel-inner h-100'>
                                {product.imagesBootstrapComponents}
                            </div>
                            <div className='carousel-indicators'>
                                {product.carouselIndicators}
                            </div>
                            <button
                                className='carousel-control-prev'
                                type='button'
                                data-bs-target='#productCarousel'
                                data-bs-slide='prev'
                            >
                                <span
                                    className='carousel-control-prev-icon'
                                    aria-hidden='true'
                                ></span>
                                <span className='visually-hidden'>
                                    Previous
                                </span>
                            </button>
                            <button
                                className='carousel-control-next'
                                type='button'
                                data-bs-target='#productCarousel'
                                data-bs-slide='next'
                            >
                                <span
                                    className='carousel-control-next-icon'
                                    aria-hidden='true'
                                ></span>
                                <span className='visually-hidden'>Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-5 h-100 pt-5'>
                    <div className='row gy-5'>
                        <div className='col-12'>
                            <div className='row'>
                                <p className='m-0 mb-3 fs-4'>{product.title}</p>
                            </div>
                            <div className='row'>
                                <p className='m-0 mb-2 fs-6'>
                                    {product.memory !== null ? `${product.title} - ${product.memory}Gb ` : `${product.title}`}
                                    {productColor !== '' && `- ${productColor}`}
                                </p>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <Select
                                        className='m-0 mb-2 w-50 fs-6'
                                        defaultOptions
                                        options={colorOptions}
                                        onChange={(e) => {
                                            setProductColor(e.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='row'>
                                <p className='m-0 fs-5 price'>
                                    {product.price} $ USD
                                </p>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='m-0 fs-6'>Cantidad</p>
                                </div>
                                <div className='col-12'>
                                    <ItemCounter
                                        itemAmount={amount}
                                        itemAmountFunction={setAmount}
                                    />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    {amount >= 1 ? (
                                        <button
                                            type='button'
                                            onClick={() => {
                                                delete product.colors;
                                                product.color = productColor;
                                                addToCart(product, amount);
                                                history.push('/Cart');
                                            }}
                                            className={`btn btn-secondary fs-6 ${
                                                productColor !== ''
                                                    ? null
                                                    : 'disabled'
                                            }`}
                                        >
                                            Agregar al carrito
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='row'>
                        <p className='text-justify lead m-0 fs-6'>
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
