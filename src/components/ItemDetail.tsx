// ! Imports
// * Libraries
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Select from 'react-select';
// * Database
import db from '../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
// Types
import {
    DocumentReference,
    DocumentSnapshot,
    DocumentData,
} from '@firebase/firestore';
// * Components
import ItemCounter from './ItemCounter';
// * Context
import CartContext from './contexts/Cart';
// * Types
import {
    CartContextInterface,
    ProductPropertiesDisplayInterface,
    ProductColorsInterface,
} from '../interfaces/ComponentsInterfaces';

// ! Item React Function Component
let colorOptions: ProductColorsInterface[] = [];
interface ItemDetailParams {
    CategoryId: string;
    ItemId: string;
}
const ItemDetail: React.FC = (props) => {
    // parameters
    const { CategoryId, ItemId } = useParams<ItemDetailParams>();
    // router
    const history = useHistory();
    // context
    let { addToCart } = useContext<CartContextInterface>(CartContext);
    // states
    const [product, setProduct] =
        useState<ProductPropertiesDisplayInterface | null>(null);
    const [productColor, setProductColor] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    function generateCarouselImages(imagesURL: string[]): JSX.Element[] {
        let imagesJSXArray: JSX.Element[] = [];
        let imagesCounter: number = 0;
        imagesURL.forEach((imageURL: string) => {
            imagesCounter++;
            imagesJSXArray.push(
                <div
                    key={`${imagesCounter}-${imageURL}`}
                    className={
                        imageURL === imagesURL[0]
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
        return imagesJSXArray;
    }

    function generateCarouselIndicators(imagesURL: string[]): JSX.Element[] {
        let buttons: JSX.Element[] = [];
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

    function formatProduct(
        data: DocumentSnapshot
    ): ProductPropertiesDisplayInterface | null {
        let product: DocumentData | undefined = data.data();
        if (product !== undefined) {
            product.id = data.id;

            // Set Color Options w/ react-select
            let colorCounter: number = 0;
            colorOptions = [];
            product.colors.forEach((color: string) => {
                let availableStock: boolean = false; // stock control
                if (
                    product !== undefined &&
                    product.stock[colorCounter] === 0
                ) {
                    availableStock = true;
                }
                colorOptions.push({
                    value: String(color),
                    label: String(color),
                    isDisabled: availableStock,
                });
                colorCounter++;
            });

            let imagesBootstrapComponents: JSX.Element[] =
                generateCarouselImages(product.imagesURL);

            let carouselIndicators: JSX.Element[] = generateCarouselIndicators(
                product.imagesURL
            );

            return {
                id: data.id,
                title: product.title,
                price: product.price,
                categoryId: product.categoryId,
                description: product.description,
                memory: product.memory,
                imagesURL: product.imagesURL,
                colors: product.colors,
                imagesBootstrapComponents,
                carouselIndicators,
            };
        } else {
            return null;
        }
    }

    async function fetchData(): Promise<void> {
        const docRef: DocumentReference = doc(db, 'items', ItemId);
        const docSnap: DocumentSnapshot = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct(formatProduct(docSnap));
        } else {
            throw new Error(`Error de obtención de datos de bd`);
        }
    }

    useEffect(() => {
        fetchData();
    }, [ItemId, CategoryId]);

    if (product !== null) {
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
                                    <span className='visually-hidden'>
                                        Next
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-5 h-100 pt-5'>
                        <div className='row gy-5'>
                            <div className='col-12'>
                                <div className='row'>
                                    <p className='m-0 mb-3 fs-4'>
                                        {product.title}
                                    </p>
                                </div>
                                <div className='row'>
                                    <p className='m-0 mb-2 fs-6'>
                                        {product.memory !== null
                                            ? `${product.title} - ${product.memory}Gb `
                                            : `${product.title}`}
                                        {productColor !== '' &&
                                            `- ${productColor}`}
                                    </p>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Select
                                            className='m-0 mb-2 w-50 fs-6'
                                            defaultOptions
                                            options={colorOptions}
                                            onChange={(e: any) => {
                                                setProductColor(
                                                    String(e.value)
                                                );
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
                                                    product.color =
                                                        productColor;
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
    } else {
        return <h1>Producto no encontrado</h1>;
    }
};

export default ItemDetail;
