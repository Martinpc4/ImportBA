// ! Context Types
// * Functions
export type AddToCartFunctionInterface = (productProperties: ProductPropertiesInterface, amount: number) => void;
export type IsInCartFunctionInterface = (product: ProductPropertiesInterface) => boolean;
export type ModifyProductAmountFunctionInterface = (product: ProductPropertiesInterface, amount:number)=> void;
export type RemoveFromCartFunctionInterface = (product: ProductPropertiesInterface) => void;
export type GetProductAmountFunctionInterface = (product: ProductPropertiesInterface)=> number | undefined;
export type GetItemsListFunctionInterface = ()=> JSX.Element[];
export type GetTotalFunctionInterface = (option: number)=> number ;
export type CheckProductForStockFunctionInterface = (productProperties: ProductPropertiesInterface, productAmount:number)=> Promise<boolean>;
export type CheckCartForStockFunctionInterface = ()=> Promise<boolean>;
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
export interface ProductPropertiesInterface {
    id: number;
    title: string;
    categoryId: number;
    description : string;
    colors?: string[];
    color?: string[];
    imagesULR: string[];
    memory: number;
    price: number;
    stock: number[];
}
export interface ProductInterface {
    product: ProductPropertiesInterface;
    amount: number;
}