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
         <div class="flex items-center justify-center pt-8">

            <form onSubmit={handleSubmit} className="flex min-w-80 max-w-xl flex-col gap-6 rounded-lg bg-gray-50 p-8">
               <h1 className=" font-bold text-2xl">Registro</h1>
               <div>
                  <label className="block mb-1">Nombre:</label>
                  <input
                     type="text"
                     name="nombre"
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                     className="w-full p-2 border rounded bg-white"
                  />
               </div>

               <div>
                  <label className="block mb-1">Apellido:</label>
                  <input
                     type="text"
                     name="apellido"
                     value={apellido}
                     onChange={(e) => setApellido(e.target.value)}
                     className="w-full p-2 border rounded"
                  />
               </div>

               <div>
                  <label className="block mb-1">Email:</label>
                  <input
                     type="email"
                     name="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full p-2 border rounded"
                  />
               </div>

               <div>
                  <label className="block mb-1">Teléfono:</label>
                  <input
                     type="tel"
                     name="telefono"
                     value={telefono}
                     onChange={(e) => setTelefono(e.target.value)}
                     className="w-full p-2 border rounded"
                  />
               </div>

               <div>
                  <label className="block mb-1">Contraseña:</label>
                  <input
                     type="password"
                     name="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full p-2 border rounded"
                  />
               </div>

               <div>
                  <label className="block mb-1">Confirmar Contraseña:</label>
                  <input
                     type="password"
                     name="confirmPw"
                     value={confirmPw}
                     onChange={(e) => setConfirmPw(e.target.value)}
                     className="w-full p-2 border rounded"
                  />
               </div>

               <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
               >
                  Registrarse
               </button>
            </form>
         </div>

      </>
   )
}

export default Register
