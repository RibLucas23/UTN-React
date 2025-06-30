import { Link } from "react-router-dom";

export default function NavBar() {
   return (
      <nav className="navbar bg-base-300 shadow-sm">
         <div className="flex-1">
            <Link to={"/"} className="btn btn-ghost text-xl">UTN-Front</Link>
         </div>
         <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
               <li><Link to={"/register"}>Registrarse</Link></li>
               <li><Link to={"/login"}>Login</Link></li>

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
