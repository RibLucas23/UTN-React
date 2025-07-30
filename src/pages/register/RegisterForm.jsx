import { modalService } from "../../services/SweetAlertService";
import { Link, useNavigate } from 'react-router-dom';
import AbstractForm from './../../components/AbstractForm';
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm() {
   const navigate = useNavigate()
   const { register } = useAuth()

   const formFields = [
      { name: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
      { name: "apellido", label: "Apellido", type: "text", placeholder: "Tu apellido" },
      { name: "email", label: "Email", type: "email", placeholder: "tucorreo@ejemplo.com" },
      { name: "telefono", label: "Teléfono", type: "tel", placeholder: "Tu número" },
      {
         name: "password",
         label: "Password",
         type: "password",
         placeholder: "Ingresá tu contraseña",
         id: "password",
         isPassword: true,
      },
      {
         name: "confirmPw", label: "Repeat Password", type: "password", placeholder: "Reingresá tu contraseña",
         id: "confirmPw",

         isPassword: true,
      }
   ];
   const validate = (formData) => {
      const newErrors = {};
      const { nombre, apellido, email, telefono, password, confirmPw } = formData;

      if (!nombre) newErrors.nombre = "Campo obligatorio";
      if (!apellido) newErrors.apellido = "Campo obligatorio";
      if (!email) newErrors.email = "Campo obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email inválido";
      if (!telefono) newErrors.telefono = "Campo obligatorio";
      if (!password) newErrors.password = "Campo obligatorio";
      else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";
      if (!confirmPw) newErrors.confirmPw = "Campo obligatorio";
      else if (confirmPw !== password) newErrors.confirmPw = "No coincide con la contraseña";

      return newErrors;
   };

   const handleSubmit = (formData) => {
      try {
         console.log("Registro:", formData);
         register(formData.email, formData.password)
         modalService.showSuccess("Haz creado tu cuenta con satisfactoriamente!")
         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         console.error("Error al registrarse:", error);
         modalService.showError("Ocurrió un error al registrarse");
      }

   };


   return (
      <AbstractForm
         formFields={formFields}
         initialFormData={{ email: "", password: "" }}
         validate={validate}
         onSubmit={handleSubmit}
         title="Registrarse"
         submitText="Registrarse"
         footer={
            <>
               <span className="text-center">
                  ¿Ya tenés cuenta?
                  <Link href="/login" className="ml-1 link link-info">Iniciar sesión</Link>
               </span>

            </>
         }
      />
   );
}


