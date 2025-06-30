import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from './Product'
export default function ProductDetailContainer() {
   const { id } = useParams()
   const [product, setProduct] = useState(null)

   useEffect(() => {
      const fetchProduct = async () => {
         const res = await fetch(`https://fakestoreapi.com/products/${id}`)
         const data = await res.json()
         setProduct(data)
      }

      fetchProduct()
   }, [id])



   return (
      <div className="p-10 max-w-7xl mx-auto">
         {!product ? (
            <div className="p-10 text-center text-xl">Cargando producto...</div>
         ) : (
            <Product productData={product} />
         )}
      </div>
   )
}
