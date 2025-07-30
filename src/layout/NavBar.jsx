import { LogOut, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeController from "../components/icons/ThemeController";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
   const { user, logout } = useAuth()
   console.log(user)
   const handleLogout = async () => {
      await logout()
   }
   return (
      <nav className="shadow-sm navbar bg-base-300">
         <div className="flex-1">
            <Link to={"/"} className="text-xl btn btn-ghost">UTN-Front</Link>
         </div>
         <div className="flex-none">
            <ul className="px-1 menu menu-horizontal">
               {!user &&
                  <>
                     <li><Link to={"/register"}>Registrarse</Link></li>
                     <li><Link to={"/login"}>Login</Link></li>
                  </>
               }
               {user &&
                  <>
                     <li><button onClick={handleLogout} > <LogOut /> Logout</button></li>

                  </>
               }

               <li>
                  <details>
                     <summary><ShoppingCart /></summary>
                     <ul className="p-2 rounded-t-none bg-base-100">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                     </ul>
                  </details>
               </li>
               <li><ThemeController /> </li>
            </ul>
         </div>
      </nav>
   )
}
