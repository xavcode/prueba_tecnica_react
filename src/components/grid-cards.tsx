'use client'
import { Product } from "@/app/types/type-products"
import CardItem from "./card-item"
const products = [
  {
    "sku": "ELEC-001",
    "name": "Samsung TV 55\"",
    "price": 599.99,
    "description": "Samsung 55\" 4K Ultra HD Smart LED TV",
    "inStock": true,    
    "imageUrl": "/assets/images/products/01_tv55.webp",
    "category": "Electronics",
    "score": 4.7
  },
  {
    "sku": "HOG-002",
    "name": "Dyson Cleaner",
    "price": 699.99,
    "description": "Dyson V11 Cordless Vacuum Cleaner with LCD Screen",
    "inStock": false,
    "imageUrl": "/assets/images/products/02_dyson.webp",
    "category": "Home",
    "score": 4.5
  },
  {
    "sku": "ELEC-003",
    "name": "Sony PlayStation 5",
    "price": 499.99,
    "description": "Sony PlayStation 5 Console with DualSense Controller",
    "inStock": true,
    "imageUrl": "/assets/images/products/03_ps5.webp",
    "category": "Sports",
    "score": 4.8
  },
  {
    "sku": "MODA-004",
    "name": "Nike Air Max 270",
    "price": 149.99,
    "description": "Nike Air Max 270 Men’s Running Shoes",
    "inStock": false,
    "imageUrl": "/assets/images/products/04_joirda_air_max_270.webp",
    "category": "Fashion",
    "score": 4.3
  }
]

function GridCards() {
  return (
    <main className="flex justify-center flex-wrap p-0 gap-4">
      {
        products.map((product:Product) => {
          return (
            <CardItem             
              key={product.sku}
              name= {product.name}
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