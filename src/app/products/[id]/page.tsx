'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useProductsStore } from '@/app/store/products_store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Product,CartItem } from '@/app/types/type-products'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { useToast } from '@/hooks/use-toast'

const productReviews = [
  {
    id: "review-001",
    user: "User123",
    review: "This product exceeded my expectations! Highly recommend it to anyone looking for quality.",
    rating: 5
  },
  {
    id: "review-002",
    user: "User456",
    review: "Decent product, but it could use some improvements. Overall, a satisfactory experience.",
    rating: 3
  },
  {
    id: "review-003",
    user: "User789",
    review: "Not worth the price. I expected better performance and quality.",
    rating: 2
  },
  {
    id: "review-004",
    user: "User101",
    review: "Great value for the money! I would definitely purchase this again.",
    rating: 4
  }
];

interface ProductPageProps {
  product: Product; 
}

const ProductPage: React.FC<ProductPageProps> = () => {
  const {toast} = useToast()
  const { id } = useParams()
  const { products, addItemToCart } = useProductsStore()
  const product = products.find(pro => pro.sku === id);
  if(!product) return


  const handleAddCardItem=(item:CartItem)=>{
    addItemToCart(product)
    toast({description:`Product ${item.name} is now in your cart!`})
  }

  if (!product) return
  return (
    <div className='flex justify-center items-center m-2 gap-2 flex-wrap'>
      <Card className='max-w-xs w-full h-[600px] bg-zinc-200/40 dark:bg-slate-700/30'>
        <CardHeader >
          <CardTitle className='text-center truncate'>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='relative w-full h-64 mb-2'>
            <Image
              className='object-cover mb-2 rounded cursor-pointer'
              src={product.imageUrl}
              alt={`picture ${product.name}`}
              fill={true}
            />
            <p className='absolute top-1 right-1 p-1 rounded text-xs uppercase'>
              sku: {product.sku}
            </p>
            <p className='absolute bottom-4 right-2 px-2 py-1 rounded text-xs'>
              ⭐ {product.score}
            </p>
          </div>
          <div className='flex justify-between'>
            <CardTitle className='text-lg font-bold'>{product.price}</CardTitle>
            <Badge variant={'outline'} className={
              clsx(
                'hover:disabled',
                {
                  "bg-teal-800": product.category === 'Fashion',
                  "bg-pink-800": product.category === 'Home',
                  "bg-cyan-800": product.category === 'Electronics',
                  "bg-yellow-700": product.category === 'Sports',
                })
            }
            >{product.category}</Badge>
          </div>
          <CardDescription className='my-1 truncate'>{product.description}</CardDescription>
          <p className={`text-sm font-bold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
            {product.inStock ? 'Available' : 'Unavailable'}
          </p>
          <div className='flex justify-center relative mt-4'>
            <Button
              onClick={()=>handleAddCardItem(product)}
              disabled={!product.inStock}
            >Add to cart</Button>
          </div>
          <div className='flex justify-center relative mt-6'  >
            <Link href={'/'}>
            <Button variant={'outline'}>BACK</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <Card className='max-w-xs w-screen h-[600px] bg-zinc-200/40 dark:bg-slate-700/30'>
        <CardHeader >
          <CardTitle className='text-center text-2xl '>Comments</CardTitle>
        </CardHeader>
        {productReviews.map((review) => (
          <CardContent key={review.user}>
            <div  className='flex items-center gap-3 hover:cursor-pointer '>
              <Avatar>
                <AvatarImage src="https://randomuser.me/api/portraits/med/men/74.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className='font-semibold hover:underline'>{review.user}</p>
            </div>
            <p className='mt-1'>{review.review}</p>
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
export default ProductPage
