import { create } from 'zustand'
import { Product, CartItem } from '../types/type-products'
import { Store } from '../types/type-store'


export const useProductsStore = create<Store>((set) => ({
  products: [],
  filteredProducts: [],
  cartItems: [],
  filters: {
    showOnlyAvailable: false,
    price: 1000,
    category: 'All',
    sortedOrder: 'price-asc',
  },

  fetchProducts: async () => {
    try {
      const res = await fetch('http://localhost:4001/products')
      const data = await res.json()
      set(state => ({
        products: data,
        filteredProducts: applyFilters(data, state.filters)
      }))
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },

  updateFilters: (newFilters: any) => set(state => {
    const updatedFilters = { ...state.filters, ...newFilters };
    const filteredProducts = applyFilters(state.products, updatedFilters);
    return { filters: updatedFilters, filteredProducts };
  }),

  addItemToCart: (item: CartItem) => set(state => {
    const existingItem = state.cartItems.find(cartItem => cartItem.sku === item.sku);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map(cartItem =>
          cartItem.sku === item.sku
            ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 } 
            : cartItem
        )
      };
    } else {
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }]
      };
    }
  }),
  
  clearCart: () => {
    set(state => ({ ...state, cartItems: [] }))
  },

  removeItemFromCart: (productId: string) => set(state => ({
    cartItems: state.cartItems.filter(item => item.sku !== productId)
  })),

}))

const applyFilters = (products: Product[], filters: any) => {
  return products.filter(product => {
    if (filters.showOnlyAvailable && !product.inStock) return false;
    if (product.price > filters.price) return false;
    if (filters.category !== 'All' && product.category !== filters.category) return false;
    return true;
  }).sort((a, b) => {
    switch (filters.sortedOrder) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });
};