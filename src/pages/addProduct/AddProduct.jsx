import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { modalService } from "../../services/SweetAlertService";
import AbstractForm from "../../components/AbstractForm";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
   const navigate = useNavigate()
   const formFields = [
      { name: "title", label: "Título", type: "text", placeholder: "Nombre del producto" },
      { name: "price", label: "Precio", type: "number", placeholder: "Precio" },
      { name: "category", label: "Categoría", type: "text", placeholder: "Ej: electronica" },
      { name: "description", label: "Descripción", type: "textarea", placeholder: "Descripción detallada" },
      { name: "image", label: "URL de la imagen", type: "url", placeholder: "https://ejemplo.com/imagen.jpg" }
   ];

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
         const productosRef = collection(db, "productos");
         await addDoc(productosRef, {
            ...formData,
            price: parseFloat(formData.price)
         });

         modalService.showSuccess("Producto agregado correctamente!");
         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         console.error("Error al agregar producto:", error);
         modalService.showError("Ocurrió un error al agregar el producto");
      }
   };

   return (
      <AbstractForm
         formFields={formFields}
         initialFormData={{
            title: "",
            price: "",
            category: "",
            description: "",
            image: ""
         }}
         validate={validate}
         onSubmit={handleSubmit}
         title="Agregar Producto"
         submitText="Agregar Producto"
      />
   );
}