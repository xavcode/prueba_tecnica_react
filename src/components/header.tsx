'use client'
import { ThemeButton } from "./theme-button"
import React from 'react'
import useProducFilters from '../hooks/useProductFilters'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Cart from "./cart"

import { ShoppingCart } from 'lucide-react'
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "postcss"
import { Button } from "./ui/button"

function Header() {
  const { priceRange,
    max_price,
    handle_sort_order,
    handle_show_available,
    handle_price_range,
    handle_category,
    cartItems,
    category,
    sortedOrder,
    categories } = useProducFilters()
  return (
    <header className="sticky top-0 flex justify-between w-screen h-auto bg-slate-800 text-white px-3 shadow-lg py-2 z-10 mb-4">
      <div className="flex flex-col w-full items-center">
        <div className="flex items-center gap-3">
          <img src="/assets/images/logo.png" alt="logo" className="h-10 w-48  mb-4" />         
          <div className=" hover:cursor-pointer">
            <Cart/>
          </div>
        </div>

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
        </div>
      </div>
      <ThemeButton />
    </header>
  )
}
export default Header