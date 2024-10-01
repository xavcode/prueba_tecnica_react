'use client'
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useProductsStore } from '@/app/store/products_store';
import { Product } from '@/app/types/type-products';

const Cart = () => {
  const { cartItems, removeItemFromCart } = useProductsStore() 
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative  text-white hover:text-green-200 transition-colors" >
          <ShoppingCart size={24} />
          <span className="absolute -top-3 -right-3 bg-green-600 rounded-full text-xs h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2 ">
        <div className="grid gap-4">
          <h3 className="font-medium leading-none">Shopping Cart</h3>
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.sku} className="flex justify-between items-center py-2">
                <span className=' text-sm '>{item.name} </span>
                <span>${(item.price).toFixed(2)}</span>
                <Button onClick={()=>removeItemFromCart(item.sku)} size={'icon'} variant={'destructive'}><Trash2/></Button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="w-full">Ir al Checkout</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;