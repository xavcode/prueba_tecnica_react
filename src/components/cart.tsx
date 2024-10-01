'use client'
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useProductsStore } from '@/app/store/products_store';

import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/app/types/type-products';

const Cart = () => {
  const { toast } = useToast()
  const { cartItems, removeItemFromCart, clearCart } = useProductsStore()
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    toast({ description: "Moving to checkout payments" }); 
  }
  const handleClean=()=>{
    clearCart();
    toast({ title: 'Notification', description: 'All items have been removed from your cart!', variant:'destructive'})
  }
  const handleRemoveItem=(item:CartItem)=>{
    removeItemFromCart(item.sku)
    toast( { title: 'Notification', description: `${item.name} Removed`, variant: "destructive", }); 
  }

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
                <Button onClick={() => handleRemoveItem(item)} size={'icon'} variant={'destructive'}><Trash2 /></Button>
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
          <Button variant={'outline'} size={'sm'} onClick={handleClean} className={cartItems.length > 0 ? 'block' : 'hidden'}>Clean</Button>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button onClick={handleCheckout} className="w-full">Checkout</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;