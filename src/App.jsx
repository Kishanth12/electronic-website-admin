import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";
import { ToastContainer, toast } from 'react-toastify';
import Category from "./pages/Category";
import Brand from "./pages/Brand";


export const backendUrl =import.meta.env.VITE_BACKEND_URL;
export const currency ="$"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');  

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === "" ? 
        <Login setToken={setToken} />
       : 
        <div>
          <NavBar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/order" element={<Order token={token} />} />
                <Route path="/category" element={<Category token={token}/>}/>
                <Route path="/brands" element={<Brand token={token}/>}/>
              </Routes>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default App;
