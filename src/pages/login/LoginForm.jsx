import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
   const [formData, setFormData] = useState({
      email: "",
      password: ""
   });

   const [errors, setErrors] = useState({
      email: "",
      password: ""
   });

   const [showPassword, setShowPassword] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const newErrors = {};

      if (!formData.email) {
         newErrors.email = "Por favor completá el email";
      }

      if (!formData.password) {
         newErrors.password = "Por favor completá la contraseña";
      } else if (formData.password.length < 6) {
         newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }

      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      console.log("Login:", formData);
   };

   const formFields = [
      {
         label: "Email",
         name: "email",
         type: "email",
         placeholder: "Ingresá tu correo",
         id: "email"
      },
      {
         label: "Contraseña",
         name: "password",
         type: showPassword ? "text" : "password",
         placeholder: "Ingresá tu contraseña",
         id: "password"
      }
   ];

   return (
      <div className="flex items-center justify-center pt-8">
         <form
            onSubmit={handleSubmit}
            className="flex min-w-80 max-w-xl flex-col gap-6 rounded-lg bg-base-300 p-8"
         >
            <h1 className="text-2xl font-bold text-center text-primary">Iniciar sesión</h1>

            {formFields.map((field) => (
               <label className="form-control w-full max-w-xs" key={field.id}>
                  <div className="label justify-between">
                     <span className="label-text">{field.label}</span>
                     {field.name === "password" && (
                        <span
                           className="label-text-alt link link-info cursor-pointer"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? "Ocultar" : "Mostrar"}
                        </span>
                     )}
                  </div>

                  <input
                     type={field.type}
                     name={field.name}
                     id={field.id}
                     value={formData[field.name]}
                     onChange={handleChange}
                     placeholder={field.placeholder}
                     className={`input input-bordered w-full ${errors[field.name] ? "input-error" : "input-primary"}`}
                  />

                  {errors[field.name] && (
                     <span className="label-text-alt text-error mt-1">{errors[field.name]}</span>
                  )}
               </label>
            ))}

            <button type="submit" className="btn btn-primary mt-2 w-full">
               Iniciar sesión
            </button>

            <span className="text-center">
               ¿No tenés cuenta?
               <Link to={"/register"} className="link link-info ml-1">
                  Registrate
               </Link>
            </span>
         </form>
      </div>
   );
}
