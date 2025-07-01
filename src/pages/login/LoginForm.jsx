import { useState } from "react";
import { Link } from "react-router-dom";
import EyeToggleButton from "../../components/icons/EyeToggleButton";

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

   const validate = () => {
      const newErrors = {}
      const { email, password } = formData
      if (!email) newErrors.email = "Por favor completá el email";
      if (!password) newErrors.password = "Por favor completá la contraseña";
      else if (password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";

      return newErrors

   }
   const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validate()
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
         id: "password",
         isPassword: true, toggle: () => setShowPassword(!showPassword),
         visible: showPassword
      }
   ];

   return (
      <div className="flex items-center justify-center pt-8">
         <form
            onSubmit={handleSubmit}
            className="flex min-w-80 max-w-xl flex-col gap-6 rounded-lg bg-base-300 p-8"
         >
            <h1 className="text-2xl font-bold text-center text-primary">Iniciar sesión</h1>

            {formFields.map(({ name, id, label, type, placeholder, isPassword, toggle, visible }) => (
               <label className="form-control w-full max-w-xs" key={id}>
                  <div className="label justify-between">
                     <span className="label-text">{label}</span>

                  </div>
                  <div className="flex">

                     <input
                        type={type}
                        name={name}
                        id={id}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={`input input-bordered w-full ${errors[name] ? "input-error" : "input-primary"}`}
                     />
                     {isPassword && (
                        <div className="h-4 w-4 opacity-70 hover:cursor-pointer">
                           <EyeToggleButton hide={visible} onClick={toggle} />
                        </div>
                     )}
                  </div>

                  {errors[name] && (
                     <span className="label-text-alt text-error mt-1">{errors[name]}</span>
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
