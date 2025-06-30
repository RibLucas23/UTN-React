import { useEffect, useState } from 'react'
import ProductsCard from './ProductsCard'


export default function ProductsContainer() {
   const [productsFetch, setProductsFetch] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const PRODUCTS_PER_PAGE = 9

   const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products")
      const data = await res.json()
      setProductsFetch(data)
   }

   useEffect(() => {
      fetchProducts()
   }, [])

   const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE
   const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE
   const currentProducts = productsFetch.slice(indexOfFirstProduct, indexOfLastProduct)

   const totalPages = Math.ceil(productsFetch.length / PRODUCTS_PER_PAGE)

   const handlePageChange = (page) => {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   return (
      <div className="w-full flex flex-col items-center gap-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts.map(product => (
               <ProductsCard key={product.id} productData={product} />
            ))}
         </div>

         <div className="join mt-4 flex flex-wrap justify-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
               <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`join-item btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
               >
                  {page}
               </button>
            ))}
         </div>
      </div>
   )
}
