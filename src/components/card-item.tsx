import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Product, CartItem } from '@/app/types/type-products'
import { Button } from './ui/button'
import { Badge } from "@/components/ui/badge"
import clsx from 'clsx'


// interface CardProps {
//   product: Product;
//   cartItem: CartItem[];
// }

function CardItem(product: Product) {
  const { name, sku, description, price, inStock, category, imageUrl, comments, score } = product
  return (
    <Card className='max-w-72 h-[450px] overflow-hidden truncat hover:scale-[1.015] transition-all bg-zinc-200/40 dark:bg-slate-700/30'>
      <CardHeader >
        <CardTitle className='text-center'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='relative flex justify-center items-center cursor-pointer'>
          {/* <Badge className='absolute top-1 right-1' > {sku}</Badge>
        <Badge className='absolute bottom-4 right-2' variant={'secondary'}>{score}</Badge> */}
          <img
            className='w-full h-48 object-cover mb-2 rounded'
            src={imageUrl}
            alt={`picture ${name}`}
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
          <Badge className={
            clsx({
              "bg-teal-800": category==='Fashion',
              "bg-pink-800": category==='Home',
              "bg-cyan-800": category==='Electronics',
              "bg-yellow-700": category==='Sports',              
            })
          }          
          >{category}</Badge>
        </div>
        <CardDescription className='my-1'>{description}</CardDescription>
        <p className={`text-sm font-bold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
          {product.inStock ? 'Available' : 'Unavailable'}
        </p>
        <div className='flex justify-center mt-2'>
          <Button
            disabled={!inStock}
          >Add to cart</Button>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

export default CardItem
