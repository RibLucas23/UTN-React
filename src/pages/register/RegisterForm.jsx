import { useState } from "react";
import EyeToggleButton from "../../components/icons/EyeToggleButton";

export default function RegisterForm() {
   const [formData, setFormData] = useState({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      password: "",
      confirmPw: ""
   });

   const [errors, setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPw, setShowConfirmPw] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
   };

   const validate = () => {
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

   const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
      console.log("Registro:", formData);
   };

   const fields = [
      { name: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
      { name: "apellido", label: "Apellido", type: "text", placeholder: "Tu apellido" },
      { name: "email", label: "Email", type: "email", placeholder: "tucorreo@ejemplo.com" },
      { name: "telefono", label: "Teléfono", type: "tel", placeholder: "Tu número" },
      {
         name: "password", label: "Contraseña", type: showPassword ? "text" : "password", placeholder: "Ingresá tu contraseña",
         isPassword: true, toggle: () => setShowPassword(!showPassword), visible: showPassword
      },
      {
         name: "confirmPw", label: "Confirmar Contraseña", type: showConfirmPw ? "text" : "password", placeholder: "Reingresá tu contraseña",
         isPassword: true, toggle: () => setShowConfirmPw(!showConfirmPw), visible: showConfirmPw
      }
   ];

   return (
      <div className="flex items-center justify-center pt-8">
         <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-6 rounded-lg bg-base-300 p-8">
            <h1 className="text-2xl font-bold text-center text-primary">Registro</h1>

            {fields.map(({ name, label, type, placeholder, isPassword, toggle, visible }) => (
               <label key={name} className="form-control w-full max-w-xs">
                  <div className="label justify-between">
                     <span className="label-text">{label}</span>
                  </div>

                  <div className="flex">
                     <input
                        name={name}
                        type={type}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        autoComplete="on"
                        className={`input input-bordered w-full pr-10 ${errors[name] ? "input-error" : "input-primary"}`}
                     />
                     {isPassword && (
                        <div className="h-4 w-4 opacity-70 hover:cursor-pointer">
                           <EyeToggleButton hide={visible} onClick={toggle} />
                        </div>
                     )}
                  </div>

                  {errors[name] && <span className="label-text-alt text-error mt-1">{errors[name]}</span>}
               </label>
            ))}

            <button type="submit" className="btn btn-primary mt-2 w-full">Registrarse</button>

            <span className="text-center">
               ¿Ya tenés cuenta?
               <a href="/login" className="link link-info ml-1">Iniciar sesión</a>
            </span>
         </form>
      </div>
   );
}


