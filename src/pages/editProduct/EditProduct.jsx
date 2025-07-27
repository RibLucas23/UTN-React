import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AbstractForm from '../../components/AbstractForm';
import { modalService } from '../../services/SweetAlertService';
import { productsService } from '../../services/FirebaseService';
import { Trash } from 'lucide-react';

export default function EditProduct() {
   const navigate = useNavigate()
   const { id } = useParams();
   const [initialData, setInitialData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [product, setProduct] = useState({})
   const formFields = [
      { name: "title", label: "Título", type: "text", placeholder: "Nombre del producto" },
      { name: "price", label: "Precio", type: "number", placeholder: "Precio en USD", step: "0.01" },
      { name: "category", label: "Categoría", type: "text", placeholder: "Ej: men's clothing" },
      { name: "description", label: "Descripción", type: "textarea", placeholder: "Descripción detallada" },
      { name: "image", label: "URL de la imagen", type: "url", placeholder: "https://ejemplo.com/imagen.jpg" }
   ];

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const product = await productsService.getById(id)


            if (!product) {
               modalService.showError("El producto no existe");
            }
            setInitialData(product);
            setProduct(product)

         } catch (error) {
            console.error("Error al cargar producto:", error);
            modalService.showError("Error al cargar el producto");
         } finally {
            setLoading(false);
         }
      };

      fetchProduct();
   }, [id]);

   const validate = (formData) => {
      const newErrors = {};
      const { title, price, category, description, image } = formData;

      if (!title) newErrors.title = "Campo obligatorio";
      if (!price) newErrors.price = "Campo obligatorio";
      else if (price <= 0) newErrors.price = "El precio debe ser mayor a 0";
      if (!category) newErrors.category = "Campo obligatorio";
      if (!description) newErrors.description = "Campo obligatorio";
      if (!image) newErrors.image = "Campo obligatorio";
      else if (!/^https?:\/\/.+\..+/.test(image)) newErrors.image = "URL inválida";

      return newErrors;
   };

   const handleSubmit = async (formData) => {
      try {
         await productsService.update(id, formData)

         modalService.showSuccess("Producto actualizado correctamente!");
         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         console.error("Error al actualizar producto:", error);
         modalService.showError("Ocurrió un error al actualizar el producto");
      }
   };
   const handleModal = async () => {
      try {
         const result = await modalService.showConfirmation(
            "Esta acción es irreversible",
            "¿Está seguro de querer eliminar este producto?"
         );

         if (result.isConfirmed) {
            handleDelete()
         } else if (result.isDismissed) {
            return
         }
      } catch (error) {
         console.error("Error al mostrar el modal:", error);
      }
   };
   const handleDelete = async () => {
      try {
         await productsService.delete(id)
         modalService.showSuccess("Producto eliminado correctamente!");
         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         console.error("Error al eliminar producto:", error);
         modalService.showError("Ocurrió un error al eliminar el producto");
      }
   }

   if (loading) return <div className='flex items-center justify-center py-8 text-3xl'>Cargando...</div>;
   if (!initialData) return <div className='flex items-center justify-center py-8 text-3xl'>Producto no encontrado</div>;

   return (
      <main className='items-start justify-center pb-8 md:flex'>

         <AbstractForm
            formFields={formFields}
            initialFormData={initialData}
            validate={validate}
            onSubmit={handleSubmit}
            title="Editar Producto"
            submitText="Guardar Cambios"
         />
         <div className='flex items-center justify-center min-h-full px-2 pt-8'>
            <div className='flex flex-col gap-6 p-8 rounded-lg min-w-80 bg-base-200'>

               <h2 className='text-2xl font-bold text-center text-primary'>Previsualizacion del producto:</h2>
               <figure className="flex items-center justify-center p-4 ">
                  <img
                     src={product.image}
                     alt={product.title}
                     className="object-contain w-auto max-h-64"
                  />
               </figure>

               <button className=' btn btn-error' onClick={handleModal} > <Trash /> ELIMINAR PRODUCTO</button>
            </div>
         </div>
      </main>
   );
}