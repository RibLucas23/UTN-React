import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../config/firebase";

const AuthContext = createContext()

const AuthProviver = ({ children }) => {
   const [user, setUser] = useState()


   //login
   const login = async (email, password) => {
      const user = await signInWithEmailAndPassword(auth, email, password)
      setUser(user)
   }
   //register
   const register = async (email, password) => {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      setUser(user)

   }

   //logout
   async function logout() {
      await signOut(auth)
      setUser()
   }


   return (
      <AuthContext.Provider value={{ login, register, user, logout }}>
         {children}
      </AuthContext.Provider>
   )
}


const useAuth = () => useContext(AuthContext)

export { AuthContext, AuthProviver, useAuth }