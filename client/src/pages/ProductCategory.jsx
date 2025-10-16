import React from 'react'
import { useAppContext } from '../contex/AppContex'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
  const { products } = useAppContext()
  const { category } = useParams()

  // Find category info (title, bg, etc.)
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  )

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  )

  return (
    <div className='mt-16'>
      {searchCategory && (
        <div className='flex flex-col w-max items-end'>
          <p className='text-2xl font-medium uppercase'>
            {searchCategory.text.toUpperCase()}
          </p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className='text-gray-500 text-center w-full mt-8'>
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductCategory
