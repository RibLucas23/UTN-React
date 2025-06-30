
export default function NavBar() {
   return (
      <nav className="navbar bg-base-300 shadow-sm">
         <div className="flex-1">
            <a className="btn btn-ghost text-xl">UTN-Front</a>
         </div>
         <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
               <li><a>Registrarse</a></li>
               <li><a>Login</a></li>

               <li>
                  <details>
                     <summary>Cart</summary>
                     <ul className="bg-base-100 rounded-t-none p-2">
                        <li><a>Link 1</a></li>
                        <li><a>Link 2</a></li>
                     </ul>
                  </details>
               </li>
            </ul>
         </div>
      </nav>
   )
}
