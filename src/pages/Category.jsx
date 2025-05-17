import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const[category,setCategory] =useState('')


   const categoryDelete = async (id)=>{
    try {
        const deleCategory = await axios.post(backendUrl+"/api/category/remove",{id})
        if (deleCategory.data.success){
            fetchCategory()
        toast.success("Category Deleted Success")
        } else {
        toast.error("Failed to delete category");
    }
    } catch (error) {
    console.error(error);
    toast.error("Error deleting category"); 
    }
   }
   
 

    const addCategory = async ()=>{
        try{
        const add= await axios.post(backendUrl+"/api/category/add",{
            name:category
        })
        if(add.data.success){
        toast.success("Category added successfully");
        setCategory("");       
        fetchCategory();         
    } else {
      toast.error("Failed to add category");
    }
    }catch(error){
       console.error(error);
      toast.error("Error adding category");
    }
 }
 
    const fetchCategory = async () => {
      try {
        const categoryData = await axios.post(backendUrl + "/api/category/list");

        if (categoryData.data.success) {
          setCategories(categoryData.data.categories);
        }
      } catch (error) {
        console.log(error);
        toast.error("cannot get Categories");
      }
    };
        
    
 

    useEffect(()=>{
        fetchCategory();
    },[])

  return (
    <div>
        <div className="w-full">
            <div>
                <h1 className="text-2xl font-bold text-gray-800" >Add Categories</h1>
            </div>
            <div className="mt-5">
                <input type="text" onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter Category Name" className="w-full px-10 py-2 sm:w-[300px]  border-gray-700"/>
                <button className="px-5 py-2 bg-gray-900 text-white rounded ml-4" onClick={addCategory}>Add</button>
            </div>
        </div>
      <div className="mt-10">
        <table className="w-full  table-auto border-collapse border border-gray-200" >
          <thead className="text-gray-900">
            <tr className="bg-gray-50"> 
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} >
                <td className="border border-gray-300 px-4 py-2 text-left">{index+1}</td>
                <td className="border border-gray-300 px-4 py-2 text-left"> {category.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-left space-x-4">
                  <button className="bg-black py-1 px-3 rounded-lg text-white">Edit</button>
                  <button className="bg-black py-1 px-3 rounded-lg text-white" onClick={()=>categoryDelete(category._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
