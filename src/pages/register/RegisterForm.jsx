import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
   const [formData, setFormData] = useState({
      nombre: "",
      apellido: "",
      email: "",
      telefono: 0,
      password: "",
      confirmPw: ""
   });

   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
   };

   const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!formData.nombre) newErrors.nombre = "Este campo es obligatorio";
      if (!formData.apellido) newErrors.apellido = "Este campo es obligatorio";
      if (!formData.email) {
         newErrors.email = "Este campo es obligatorio";
      } else if (!validateEmail(formData.email)) {
         newErrors.email = "Email inválido";
      }

      if (!formData.telefono) newErrors.telefono = "Este campo es obligatorio";
      if (!formData.password) {
         newErrors.password = "Este campo es obligatorio";
      } else if (formData.password.length < 6) {
         newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }

      if (!formData.confirmPw) {
         newErrors.confirmPw = "Este campo es obligatorio";
      } else if (formData.confirmPw !== formData.password) {
         newErrors.confirmPw = "Las contraseñas no coinciden";
      }

      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      console.log("Registro:", formData);
   };

   const formCamps = [
      { name: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre", id: "nombre" },
      { name: "apellido", label: "Apellido", type: "text", placeholder: "Tu apellido", id: "apellido" },
      { name: "email", label: "Email", type: "email", placeholder: "tucorreo@ejemplo.com", id: "email" },
      { name: "telefono", label: "Teléfono", type: "number", placeholder: "Tu número", id: "telefono" },
      { name: "password", label: "Contraseña", type: "password", placeholder: "Mínimo 6 caracteres", id: "password" },
      { name: "confirmPw", label: "Confirmar Contraseña", type: "password", placeholder: "Repite la contraseña", id: "confirmPw" }
   ];

   return (
      <div className="flex items-center justify-center pt-8">
         <form
            onSubmit={handleSubmit}
            className="flex min-w-80 max-w-xl flex-col gap-6 rounded-lg bg-base-300 p-8"
         >
            <h1 className="text-2xl font-bold text-center text-primary">Registro</h1>

            {formCamps.map((camp) => (
               <label className="form-control w-full max-w-xs" key={camp.id}>
                  <div className="label">
                     <span className="label-text">{camp.label}</span>
                  </div>
                  <input
                     type={camp.type}
                     name={camp.name}
                     value={formData[camp.name]}
                     onChange={handleChange}
                     autoComplete="on"
                     placeholder={camp.placeholder}
                     className={`input input-bordered w-full ${errors[camp.name] ? "input-error" : "input-primary"}`}
                  />
                  {errors[camp.name] && (
                     <span className="label-text-alt text-error mt-1">{errors[camp.name]}</span>
                  )}
               </label>
            ))}

            <button type="submit" className="btn btn-primary mt-2 w-full">
               Registrarse
            </button>

            <span className="text-center">
               ¿Ya tenés cuenta?
               <Link to={"/login"} className="link link-info ml-1">
                  Iniciar sesión
               </Link>
            </span>
         </form>
      </div>
   );
}


