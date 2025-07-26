import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import AbstractForm from '../../components/AbstractForm';
import { modalService } from '../../services/SweetAlertService';

export default function EditProduct() {
   const navigate = useNavigate()
   const { id } = useParams();
   const [initialData, setInitialData] = useState(null);
   const [loading, setLoading] = useState(true);

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
            const docRef = doc(db, "productos", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
               setInitialData({
                  ...docSnap.data(),
                  // Asegurarnos que el precio sea string para el input
                  price: docSnap.data().price.toString()
               });
            } else {
               modalService.showError("El producto no existe");
            }
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
         const docRef = doc(db, "productos", id);
         await updateDoc(docRef, {
            ...formData,
            price: parseFloat(formData.price) // Convertir a número
         });

         modalService.showSuccess("Producto actualizado correctamente!");
         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         console.error("Error al actualizar producto:", error);
         modalService.showError("Ocurrió un error al actualizar el producto");
      }
   };

   if (loading) return <div>Cargando...</div>;
   if (!initialData) return <div>Producto no encontrado</div>;

   return (
      <AbstractForm
         formFields={formFields}
         initialFormData={initialData}
         validate={validate}
         onSubmit={handleSubmit}
         title="Editar Producto"
         submitText="Guardar Cambios"
      />
   );
}