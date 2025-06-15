import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const SideBar = () => {
  return (
    <div className='w-[20%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[10%] text-[15px]'>
          <NavLink className='flex items-center gap-3 border-gray-200 border px-3 py-2 rounded-l' to='./category'>
              <img className='w-5 h-5' src={assets.category_icon} alt="" />
              <p className='hidden md:block'>Manage Categories</p>
            </NavLink>
              <NavLink className='flex items-center gap-3 border-gray-200 border px-3 py-2 rounded-l' to='./brands'>
              <img className='w-5 h-5' src={assets.category_icon} alt="" />
              <p className='hidden md:block'>Manage Brands</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border-gray-200 border px-3 py-2 rounded-l' to='./add'>
              <img className='w-5 h-5' src={assets.add_icon} alt="" />
              <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border-gray-200 border px-3 py-2 rounded-l' to='./list'>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border-gray-200 border px-3 py-2 rounded-l' to='./order'>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar