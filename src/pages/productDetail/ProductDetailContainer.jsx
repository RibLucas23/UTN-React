import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';
import { modalService } from '../../services/SweetAlertService';
import { productsService } from '../../services/FirebaseService';

export default function ProductDetailContainer() {
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            setLoading(true);
            const data = await productsService.getById(id)
            console.log(data)
            if (data) {
               setProduct(data);
            } else {
               setError("El producto no existe");
               modalService.showError("Producto no encontrado");
            }
         } catch (err) {
            console.error("Error al obtener producto:", err);
            setError("Error al cargar el producto");
            modalService.showError("Error al cargar el producto");
         } finally {
            setLoading(false);
         }
      };

      fetchProduct();
   }, [id]);

   return (
      <div className="p-10 mx-auto max-w-7xl">
         {loading ? (
            <div className="p-10 text-xl text-center">Cargando producto...</div>
         ) : error ? (
            <div className="p-10 text-xl text-center text-error">{error}</div>
         ) : (
            <Product productData={product} />
         )}
      </div>
   );
}