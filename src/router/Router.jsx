import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './../pages/home/Home';
import ProductDetail from "../pages/productDetail/ProductDetail";

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />

         </Routes>
      </BrowserRouter>

   )

}
export { Router }