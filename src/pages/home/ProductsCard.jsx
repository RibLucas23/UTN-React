import { Link } from "react-router-dom"

export default function ProductsCard({ productData }) {
   return (
      <Link to={`product/${productData.id}`} className="px-2 shadow-sm card bg-base-100 max-w-96 border-1 border-base-300">
         <figure className="flex items-center justify-center w-full h-48 bg-white">
            <img
               src={productData.image}
               alt="Product"
               className="object-contain w-full h-full"
            />
         </figure>
         <div className="card-body">
            <h2 className="card-title">{productData.title}</h2>
            <p className='line-clamp-1 '>{productData.description}</p>
            <div className="items-center justify-end card-actions">
               <span className='text-2xl font-bold text-center'>${productData.price}</span>
               <button className="btn btn-primary">Buy Now</button>
            </div>
         </div>
      </Link>
   )
}
