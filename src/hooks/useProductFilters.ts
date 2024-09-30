'use client'
import { useEffect, useState } from 'react';
import { useProductsStore } from '../app/store/products_store';

const useProductFilters = () => {
  const store_products = useProductsStore()
  const { products, filters, cartItems, updateFilters } = store_products
  const { sortedOrder, category } = filters

  //to get the values of the all prices, and map then to the slider
  const range_prices: number[] = products.map(product => product.price)
  const max_price = Math.max(...range_prices)  
  const [priceRange, setPriceRange] = useState(max_price)
  
  //* Create array of categories from products existing
  const categories = ['All']
  products.map(product => {
    if (!categories.includes(product.category)) {
      categories.push(product.category)
    }
  })
  
  //* filter products  
  const handle_sort_order = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ sortedOrder: e.target.value })
  }
  
  const handle_show_available = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ showOnlyAvailable: e.target.checked })
  }
  
  const handle_price_range = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(e.target.value)
    updateFilters({ price })
    setPriceRange(price)
  }
  
  const handle_category = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ category: e.target.value })
  }
  
  useEffect(() => {
    setPriceRange(max_price)
    updateFilters({ price: max_price })
  }, [max_price])

  return {
    priceRange,
    max_price,
    handle_sort_order,
    handle_show_available,
    handle_price_range,
    handle_category,
    cartItems,
    category,
    sortedOrder,
    categories,
  };
};

export default useProductFilters;