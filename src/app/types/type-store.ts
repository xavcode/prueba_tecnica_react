import { Product, CartItem } from "./type-products";

export interface Store {
  products: Product[],
  cartItems: CartItem[],
  filteredProducts: Product[],
  
  fetchProducts: () => Promise<void>;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (productId: string) => void;  
  updateFilters: (filters: any) => void;
  clearCart: ()=>void;
  
  filters: {
    showOnlyAvailable: boolean,
    price: number,
    category: string,    
    sortedOrder: string
  },
}
