import React from 'react'
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { backendUrl } from '../App';


const Brand = () => {
   const [brands, setBrands] = useState([]);
  const[brand,setBrand] =useState('')


   const brandDelete = async (id)=>{
    try {
        const deleteBrand = await axios.post(backendUrl+"/api/brand/remove",{id})
        if (deleteBrand.data.success){
            fetchBrands()
        toast.success("Brand Deleted Success")
        } else {
        toast.error("Failed to Brand category");
    }
    } catch (error) {
    console.error(error);
    toast.error("Error deleting Brand"); 
    }
   }
   
 

    const addBrand = async ()=>{
        try{
        const add= await axios.post(backendUrl+"/api/brand/add",{
            name:brand
        })
        if(add.data.success){
        toast.success("Brand added successfully");
        setBrand("");       
        fetchBrands();         
    } else {
      toast.error("Failed to add Brand");
    }
    }catch(error){
       console.error(error);
      toast.error("Error adding Brand");
    }
 }
 
    const fetchBrands = async () => {
      try {
        const brandData = await axios.post(backendUrl + "/api/brand/list");

        if (brandData.data.success) {
          setBrands(brandData.data.brands);
        }
      } catch (error) {
        console.log(error);
        toast.error("cannot get Brands");
      }
    };
        
    
 

    useEffect(()=>{
        fetchBrands();
    },[])

  return (
    <div>
        <div className="w-full">
            <div>
                <h1 className="text-2xl font-bold text-gray-800" >Add Brands</h1>
            </div>
            <div className="mt-5">
                <input type="text" onChange={(e)=>{setBrand(e.target.value)}} value={brand} placeholder="Enter Brand Name" className="w-full px-10 py-2 sm:w-[300px]  border-gray-700"/>
                <button className="px-5 py-2 bg-gray-900 text-white rounded ml-4" onClick={addBrand}>Add</button>
            </div>
        </div>
      <div className="mt-10">
        <table className="w-full  table-auto border-collapse border border-gray-200" >
          <thead className="text-gray-900">
            <tr className="bg-gray-50"> 
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Brand Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand._id} >
                <td className="border border-gray-300 px-4 py-2 text-left">{index+1}</td>
                <td className="border border-gray-300 px-4 py-2 text-left"> {brand.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-left space-x-4">
                  <button className="bg-black py-1 px-3 rounded-lg text-white">Edit</button>
                  <button className="bg-black py-1 px-3 rounded-lg text-white" onClick={()=>brandDelete(brand._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default Brand