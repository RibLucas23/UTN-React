import { useState } from "react";
import { Link } from "react-router-dom";
import EyeToggleButton from "../../components/icons/EyeToggleButton";
import { modalService } from "../../services/SweetAlertService";

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
      try {
         e.preventDefault();
         const newErrors = validate()
         if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
         }

         console.log("Login:", formData);
         setErrors({})
         modalService.showSuccess("Login con exito!")
      } catch (error) {
         console.log(error)
      }
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
         label: "Password",
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
            className="flex flex-col max-w-xl gap-6 p-8 rounded-lg min-w-80 bg-base-200"
         >
            <h1 className="text-2xl font-bold text-center text-primary ">Iniciar sesión</h1>


            {formFields.map(({ name, id, label, type, placeholder, isPassword, toggle, visible }) => (
               <label className="w-full max-w-xs form-control" key={id}>
                  <div className="flex justify-between pb-1 label ">
                     <span className="label-text">{label}</span>
                     {label === 'Password' &&
                        (<span class="link label-text-alt link-info no-underline">Forgot password</span>)
                     }

                  </div>
                  <div className={`input input-bordered border-2 rounded-lg w-full ${errors[name] ? "input-error" : "input-primary"} flex  px-0 `} >

                     <input
                        type={type}
                        name={name}
                        id={id}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={'pl-4 '}
                     />
                     {isPassword && (
                        <EyeToggleButton hide={visible} onClick={toggle} className={`h-4 w-4 opacity-70 hover:cursor-pointer `} />
                     )}
                  </div>

                  {errors[name] && (
                     <span className="mt-1 label-text-alt text-error">{errors[name]}</span>
                  )}
               </label>
            ))}

            <button type="submit" className="w-full mt-2 btn btn-primary">
               Iniciar sesión
            </button>

            <span className="text-center">
               ¿No tenés cuenta?
               <Link to={"/register"} className="ml-1 link link-info">
                  Registrate
               </Link>
            </span>
         </form>
      </div>
   );
}
