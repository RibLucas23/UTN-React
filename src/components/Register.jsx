import { useState } from "react"

function Register() {
   const [nombre, setNombre] = useState("")
   const [apellido, setApellido] = useState("")
   const [email, setEmail] = useState("")
   const [telefono, setTelefono] = useState()
   const [password, setPassword] = useState("")
   const [confirmPw, setConfirmPw] = useState("")


   const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ nombre, apellido, email, telefono, password, confirmPw });
   };

   return (
      <>
         <div className="flex items-center justify-center pt-8">
            <form
               onSubmit={handleSubmit}
               className="flex min-w-80 max-w-xl flex-col gap-6 rounded-lg bg-base-300 p-8"
            >
               <h1 className="text-2xl font-bold text-center text-primary">Registro</h1>

               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Nombre</span>
                  </div>
                  <input
                     type="text"
                     name="nombre"
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                     placeholder="Tu nombre"
                     className="input input-bordered input-primary w-full"
                  />
               </label>

               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Apellido</span>
                  </div>
                  <input
                     type="text"
                     name="apellido"
                     value={apellido}
                     onChange={(e) => setApellido(e.target.value)}
                     placeholder="Tu apellido"
                     className="input input-bordered input-primary w-full"
                  />
               </label>

               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Email</span>
                  </div>
                  <input
                     type="email"
                     name="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="tucorreo@ejemplo.com"
                     className="input input-bordered input-primary w-full"
                  />
               </label>

               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Teléfono</span>
                  </div>
                  <input
                     type="tel"
                     name="telefono"
                     value={telefono}
                     onChange={(e) => setTelefono(e.target.value)}
                     placeholder="Tu número"
                     className="input input-bordered input-primary w-full"
                  />
               </label>

               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Contraseña</span>
                  </div>
                  <input
                     type="password"
                     name="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Mínimo 6 caracteres"
                     className="input input-bordered input-primary w-full"
                  />
               </label>

               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Confirmar Contraseña</span>
                  </div>
                  <input
                     type="password"
                     name="confirmPw"
                     value={confirmPw}
                     onChange={(e) => setConfirmPw(e.target.value)}
                     placeholder="Repite la contraseña"
                     className="input input-bordered input-primary w-full"
                  />
               </label>

               <button
                  type="submit"
                  className="btn btn-primary mt-2 w-full"
               >
                  Registrarse
               </button>

               <span className="text-center">
                  ¿Ya tenés cuenta?
                  <a href="/login" className="link link-info ml-1">Iniciar sesión</a>
               </span>
            </form>
         </div>

      </>
   )
}

export default Register
