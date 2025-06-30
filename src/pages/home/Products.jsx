import ProductsContainer from './ProductsContainer'

export default function Products() {
   return (
      <article className='flex flex-col justify-center items-center gap-4 md:flex-row flex-wrap my-4 ' >

         <ProductsContainer />
      </article>
   )
}
