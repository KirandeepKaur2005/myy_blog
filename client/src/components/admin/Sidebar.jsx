// Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        md:static md:translate-x-0 md:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Close button for mobile */}
      <div className='flex justify-end md:hidden p-3'>
        <button onClick={closeSidebar} className="text-xl">✖</button>
      </div>

      <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
        <NavLink end={true} to='/admin' className={({isActive}) => 
          `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }>
          <img src={assets.home_icon} className='w-5' />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to='/admin/addBlog' className={({isActive}) => 
          `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }>
          <img src={assets.add_icon} className='w-5' />
          <p>Add Blog</p>
        </NavLink>

        <NavLink to='/admin/listBlog' className={({isActive}) => 
          `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }>
          <img src={assets.list_icon} className='w-5' />
          <p>Blog Lists</p>
        </NavLink>

        <NavLink to='/admin/comments' className={({isActive}) => 
          `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }>
          <img src={assets.comment_icon} className='w-5' />
          <p>Comments</p>
        </NavLink>
      </div>

    </div>
  )
}

export default Sidebar;
