import { useState } from "react";

function RegisterForm() {
   const [formData, setFormData] = useState({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      password: "",
      confirmPw: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
   };

   const formCamps = [
      { name: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre", id: "nombre" },
      { name: "apellido", label: "Apellido", type: "text", placeholder: "Tu apellido", id: "apellido" },
      { name: "email", label: "Email", type: "email", placeholder: "tucorreo@ejemplo.com", id: "email" },
      { name: "telefono", label: "Teléfono", type: "tel", placeholder: "Tu número", id: "telefono" },
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
            {
               formCamps.map((camp) => (
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
                        className="input input-bordered input-primary w-full"
                     />
                  </label>
               ))
            }

            <button type="submit" className="btn btn-primary mt-2 w-full">
               Registrarse
            </button>

            <span className="text-center">
               ¿Ya tenés cuenta?
               <a href="/login" className="link link-info ml-1">Iniciar sesión</a>
            </span>
         </form>
      </div>
   );
}

export default RegisterForm;
