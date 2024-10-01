import React from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from './ui/button'
import { Badge } from "@/components/ui/badge"
import clsx from 'clsx'
import { useRouter } from "next/navigation";
import { useProductsStore } from '@/app/store/products_store'
import { Product, CartItem } from '@/app/types/type-products'


function CardItem(cartItem: CartItem) {

  const router = useRouter();
  const { addItemToCart } = useProductsStore()
  const { name, sku, description, price, inStock, category, score } = cartItem

  const handleDetail = (sku: string): any => {
    router.push(`/products/${sku}`);
  };


  return (
    <Card className='max-w-xs w-full h-[450px] overflow-hidden truncat hover:brightness-110 transition-all bg-zinc-200/40 dark:bg-slate-700/30'>
      <CardHeader >
        <CardTitle className='text-center truncate'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='relative w-full h-52 mb-2'
        >
          <Image
            className='object-cover mb-2 rounded cursor-pointer hover:scale-[1.015] transition-all'
            src={cartItem.imageUrl}
            alt={`picture ${name}`}
            fill={true}
            onClick={() => handleDetail(cartItem.sku)}
          />
          <p className='absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded text-xs uppercase'>
            sku: {sku}
          </p>
          <p className='absolute bottom-4 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs'>
            ⭐ {score}
          </p>
        </div>
        <div className='flex justify-between'>
          <CardTitle className='text-lg font-bold'>{price}</CardTitle>
          <Badge variant={'outline'} className={
            clsx(
              'hover:disabled',
              {
                "bg-teal-800": category === 'Fashion',
                "bg-pink-800": category === 'Home',
                "bg-cyan-800": category === 'Electronics',
                "bg-yellow-700": category === 'Sports',
              })
          }
          >{category}</Badge>
        </div>
        <CardDescription className='my-1 truncate'>{description}</CardDescription>
        <p className={`text-sm font-bold ${cartItem.inStock ? 'text-green-400' : 'text-red-400'}`}>
          {cartItem.inStock ? 'Available' : 'Unavailable'}
        </p>
        <div className='flex justify-center mt-6'>
          <Button
            onClick={() => addItemToCart(cartItem,)}
            disabled={!inStock}
          >Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardItem
