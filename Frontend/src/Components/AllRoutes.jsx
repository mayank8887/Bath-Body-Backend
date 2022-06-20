import React from "react";
import { Routes,Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Product from "../Pages/Product";
import Products from "../Pages/Products";
import Cart from "../Pages/Cart";


const AllRoutes =()=>{
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:id" element={<Product/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    )
}

export default AllRoutes;