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