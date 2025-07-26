import { Link, useNavigate } from "react-router-dom";
import { modalService } from "../../services/SweetAlertService";
import AbstractForm from "../../components/AbstractForm";

export default function LoginForm() {
   const navigate = useNavigate()
   const formFields = [
      {
         label: "Email",
         name: "email",
         type: "email",
         placeholder: "Ingresá tu correo",
         id: "email"
      },
      {
         label: "Password",
         name: "password",
         type: "password",
         placeholder: "Ingresá tu contraseña",
         id: "password",
         isPassword: true,
         extraLabel: (
            <span className="no-underline link label-text-alt link-info">
               Forgot password
            </span>
         )
      }
   ];

   const validate = (formData) => {
      const newErrors = {};
      if (!formData.email) newErrors.email = "Por favor completá el email";
      if (!formData.password) newErrors.password = "Por favor completá la contraseña";
      else if (formData.password.length < 6) {
         newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }
      return newErrors;
   };

   const handleSubmit = (formData) => {
      try {
         console.log("Login:", formData);
         modalService.showSuccess("Login con exito!");
         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         console.error("Error al iniciar sesión:", error);
         modalService.showError("Ocurrió un error al iniciar sesión");
      }
   };


   return (
      <AbstractForm
         formFields={formFields}
         initialFormData={{ email: "", password: "" }}
         validate={validate}
         onSubmit={handleSubmit}
         title="Iniciar sesión"
         submitText="Iniciar sesión"
         footer={
            <>
               ¿No tenés cuenta?
               <Link to="/register" className="ml-1 link link-info">
                  Registrate
               </Link>
            </>
         }
      />
   );
}
