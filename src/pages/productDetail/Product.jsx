import { ShoppingCart } from "lucide-react";

export default function Product({ productData }) {
   return (
      <div className="card bg-base-100 shadow-sm flex flex-col lg:flex-row max-w-5xl mx-auto p-4">
         <figure className="p-4 flex justify-center items-center lg:w-1/3">
            <img
               src={productData.image}
               alt={productData.title}
               className="max-h-64 w-auto object-contain"
            />
         </figure>

         <div className="card-body lg:w-2/3 space-y-4">
            <h2 className="card-title text-xl md:text-2xl lg:text-3xl font-semibold">{productData.title}</h2>

            <p className="text-base md:text-lg  text-gray-300 leading-relaxed">
               {productData.description}
            </p>

            <div className="card-actions justify-end items-center pt-4 gap-6 pr-6">
               <span className="text-lg md:text-xl lg:text-2xl font-bold  text-green-500 border-green-300 border-1 px-3 py-1 rounded-2xl">
                  ${productData.price}
               </span>
               <button className="btn btn-primary text-base md:text-lg">Buy <ShoppingCart /></button>
            </div>
         </div>
      </div>
   )
}
