// Layout.jsx
import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

  const { axios, token, setToken, navigate } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/')
  }

  return (
    <div>
      {/* NAVBAR */}
      <div className='flex justify-between items-center w-full h-[70px] py-2 px-4 sm:px-12 border-b border-gray-200'>

        {/* Hamburger — only mobile */}
        <button 
          className="md:hidden block"
          onClick={() => setSidebarOpen(true)}
        >
          <img src={assets.menu_icon} alt="menu" className="w-7" />
        </button>

        <img 
          onClick={() => navigate('/')} 
          src={assets.logo} 
          alt="logo" 
          className='w-28 sm:w-44 cursor-pointer' 
        />

        <button 
          onClick={logout} 
          className='bg-primary/90 hover:bg-primary px-6 sm:px-10 py-2.5 rounded-full text-sm text-white'
        >
          Logout
        </button>
      </div>

      {/* PAGE WRAPPER */}
      <div className='flex h-[calc(100vh-70px)]'>
        
        {/* SIDEBAR */}
        <Sidebar 
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
