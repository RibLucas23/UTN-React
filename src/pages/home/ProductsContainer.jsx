import { useEffect, useState } from 'react'
import ProductsCard from './ProductsCard'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'


export default function ProductsContainer() {
   const [productsFetch, setProductsFetch] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const PRODUCTS_PER_PAGE = 9

   const fetchProducts = async () => {
      const productosRef = collection(db, "productos");
      const snapshot = await getDocs(productosRef);
      const data = snapshot.docs.map(doc => ({
         ...doc.data(),
         id: doc.id  // Esto agrega el ID del documento de Firestore
      }));
      setProductsFetch(data);
   };
   useEffect(() => {
      try {
         fetchProducts()

      } catch (error) {
         console.log("Error:", error)
      }
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
      <div className="flex flex-col items-center w-full gap-4">
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map(product => (
               <ProductsCard key={product.id} productData={product} />
            ))}
         </div>
         <div>
         </div>

         <div className="flex flex-wrap justify-center gap-1 mt-4 join">
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
