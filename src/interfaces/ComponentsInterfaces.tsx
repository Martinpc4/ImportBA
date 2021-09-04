// ! Context Types
import * as React from 'react';
import { DocumentData } from "@firebase/firestore";

// * Functions
export type AddToCartFunctionInterface = (
    productProperties: ProductPropertiesInterface,
    amount: number
) => void;
export type IsInCartFunctionInterface = (
    product: ProductPropertiesInterface
) => boolean;
export type ModifyProductAmountFunctionInterface = (
    product: ProductPropertiesInterface,
    amount: number
) => void;
export type RemoveFromCartFunctionInterface = (
    product: ProductPropertiesInterface
) => void;
export type GetProductAmountFunctionInterface = (
    product: ProductPropertiesInterface
) => number;
export type GetItemsListFunctionInterface = () => JSX.Element[];
export type GetTotalFunctionInterface = (option?: number) => number;
export type CheckProductForStockFunctionInterface = (
    productProperties: ProductPropertiesInterface,
    productAmount: number
) => Promise<boolean>;
export type CheckCartForStockFunctionInterface = () => Promise<boolean>;
export type CleanCartFunctionInterface = () => void;

// * Context
export interface CartContextInterface {
    iva: number;
    dolar: number;
    Cart: React.ComponentState;
    addToCart: AddToCartFunctionInterface;
    removeFromCart: RemoveFromCartFunctionInterface;
    modifyProductAmount: ModifyProductAmountFunctionInterface;
    isInCart: IsInCartFunctionInterface;
    cleanCart: CleanCartFunctionInterface;
    getProductAmount: GetProductAmountFunctionInterface;
    getTotal: GetTotalFunctionInterface;
    getItemsList: GetItemsListFunctionInterface;
    checkProductForStock: CheckProductForStockFunctionInterface;
    checkCartForStock: CheckCartForStockFunctionInterface;
}

// ! Product-related Interfaces
export interface ProductPropertiesInterface{
    id: string;
    title: string;
    categoryId: number;
    description: string;
    colors?: string[];
    color?: string[];
    imagesURL: string[];
    memory: number;
    price: number;
    stock?: number[];
    amount?: number;
}
export interface ProductInterface {
    product: ProductPropertiesInterface;
    amount: number;
}
export interface ProductPropertiesDisplayInterface extends DocumentData{
    id: string;
    categoryId: number;
    title: string;
    price: number;
    description: string;
    memory: number;
    imagesURL: string[];
    colors?: string[];
    imagesBootstrapComponents: JSX.Element[];
    carouselIndicators: JSX.Element[];
}
export interface ProductPropertiesFirebaseInterface {
    id: string;
    title: string;
    categoryId: number;
    description: string;
    colors?: string[];
    color?: string[];
    imagesURL: string[];
    memory: number;
    price: number;
    stock?: number[];
    amount?: number;
}
export interface ProductColorsInterface {
    value: string;
    label: string;
    isDisabled: boolean;
}

// ! Component Specific Interfaces
// * Error Component Interface
export interface ErrorInterface {
    id: number;
    title: string | undefined;
    description: string | undefined;
}
// * Checkout Component
export interface PurchaseStateInterface {
    state: boolean;
    purchaseId: string | undefined;
}
export interface UserDataInterface {
    userName: string | undefined;
    userLastName: string | undefined;
    userEmail1: string | undefined;
    userEmail2: string | undefined;
    userTyC: boolean;
    userCellphone: number | undefined;
    userAddress: string | undefined;
    userProvince: string | undefined;
    userTown: string | undefined;
    userZipcode: string | number | undefined;
}
