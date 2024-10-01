export interface Product {
    sku: string;
    name: string;
    price: number;
    description: string;
    inStock: boolean;
    imageUrl: string;
    category: string;
    score?: number;
    comments? : string;
}
export interface CartItem extends Product{
    quantity?: number;
}