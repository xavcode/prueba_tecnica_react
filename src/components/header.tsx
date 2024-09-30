'use client'
import { ThemeButton } from "./theme-button"
import React from 'react'
import useProducFilters from '../hooks/useProductFilters'

import { ShoppingCart } from 'lucide-react'

function Header() {  
  const {priceRange,
    max_price,
    handle_sort_order,
    handle_show_available,
    handle_price_range,
    handle_category,
    cartItems,
    category,
    sortedOrder,
    categories} = useProducFilters()
  
  return (
    <header className="sticky top-0 flex justify-between w-screen h-auto bg-slate-800 text-white p-2 shadow-lg  z-10 mb-4">
      <div className="flex flex-col w-full items-center">
        <img src="/assets/images/logo.png" alt="logo" className="h-10 w-48  mb-4" />

        <div className="flex flex-wrap justify-center w-full items-center gap-8">
          <div className="flex items-center">
            <label htmlFor="price-range" className="mr-2 text-sm">Price:</label>
            <input
              type="range"
              id="price-range"
              min={0}
              max={max_price}
              step="100"
              value={priceRange}
              onChange={(e) => (handle_price_range(e))}
              className="w-40 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-sm">${0} - ${priceRange}</span>
          </div>

          <div className="flex items-center">
            <label htmlFor="category" className="mr-2 text-sm">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => handle_category(e)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5"
            >
              {categories.map(category => {
                return (
                  <option key={category} value={category}>{category}</option>
                )
              })}
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="sort-order" className="mr-2 text-sm">Sort:</label>
            <select
              id="sort-order"
              value={sortedOrder}
              onChange={(e) => handle_sort_order(e)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5"
            >
              <option value="price-asc"> Price Ascending</option>
              <option value="price-desc"> Price Descending</option>
              <option value="name-asc"> Name Ascending</option>
              <option value="name-desc"> Name Descending</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              onChange={(e) => (handle_show_available(e))}
              className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
            />
            <label htmlFor="available" className="ml-2 text-sm">Show only available</label>
          </div>

          <div className=" fixed right-6 bottom-10 md:block hover:cursor-pointer">
            <button className="relative  text-white hover:text-green-200 transition-colors" >
              <ShoppingCart size={32} />
              <span className="absolute -top-2 -right-2 bg-green-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
          </div>

        </div>
      </div>
      <ThemeButton />
    </header>
  ) 
}
export default Header