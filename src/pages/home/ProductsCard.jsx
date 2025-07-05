import { Link } from "react-router-dom"

export default function ProductsCard({ productData }) {
   return (
      <Link to={`product/${productData.id}`} className="card bg-base-100 max-w-96 shadow-sm px-2   border-1 border-base-300">
         <figure className="w-full h-48 flex items-center justify-center bg-white">
            <img
               src={productData.image}
               alt="Product"
               className="w-full h-full object-contain"
            />
         </figure>
         <div className="card-body">
            <h2 className="card-title">{productData.title}</h2>
            <p className='line-clamp-1  '>{productData.description}</p>
            <div className="card-actions justify-end items-center">
               <span className='text-center text-2xl font-bold'>${productData.price}</span>
               <button className="btn btn-primary">Buy Now</button>
            </div>
         </div>
      </Link>
   )
}
