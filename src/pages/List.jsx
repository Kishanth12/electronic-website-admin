import React, { useEffect,useState } from 'react'
import { backendUrl, currency } from './../App';
import { toast } from 'react-toastify';
import axios from 'axios'

const List = ({token}) => {
  const [list,setList]=useState([]);

  const fetchList = async()=>{
    try {
      const response = await axios.get(backendUrl+'/api/product/list',
       {headers: { token }} )
      if(response.data.success){
      setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct=async(id)=>{
    try {
      const response = await axios.delete(backendUrl + '/api/product/remove', {
      headers: { token },
      data: { id },
    });
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  useEffect(()=>{
       fetchList()
  },[])
  return (
    <div>
      <p className='mb-2'>
        All Products List
      </p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Brand</b>
          <b>Price</b>
          <b className='text-center'>Actions</b>
        </div>
        {
          list.map((item)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_0.5fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm' key={item._id}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item?.name}</p>
              <p>{item.category?.name}</p>
              <p>{item.brand?.name}</p>
              <p>{currency}{item.price}</p>
              <p className='text-right md:text-center cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>X</p>
            </div>
          ))
        }
      </div>
      </div>
  )
}

export default List