'use client'
import { useEffect } from "react"

import { Product } from "@/app/types/type-products"
import CardItem from "./card-item"
import { useProductsStore } from "@/app/store/products_store"

function GridCards() {
  const { filteredProducts, fetchProducts } = useProductsStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <main className="flex justify-center flex-wrap p-0 gap-4 m-3">
      {
        filteredProducts.map((product: Product) => {
          return (
            <CardItem
              key={product.sku}
              name={product.name}
              sku={product.sku}
              price={product.price}
              description={product.description}
              category={product.category}
              imageUrl={product.imageUrl}
              inStock={product.inStock}
              score={product.score}
            />
          )
        })
      }
    </main>
  )
}
export default GridCards