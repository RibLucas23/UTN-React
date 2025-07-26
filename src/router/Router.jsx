import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './../pages/home/Home';
import ProductDetail from "../pages/productDetail/ProductDetail";
import LoginView from "../pages/login/LoginView";
import RegisterView from "../pages/register/RegisterView";
import AddProductView from "../pages/addProduct/AddProductView";
import EditProductView from "../pages/editProduct/EditProductView";

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/addProduct" element={<AddProductView />} />
            <Route path="/editProduct/:id" element={<EditProductView />} />
            <Route path="/product/:id" element={<ProductDetail />} />

         </Routes>
      </BrowserRouter>

   )

}
export { Router }