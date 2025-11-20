import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

    const {axios, token, setToken, navigate} = useAppContext();

    const logout = () => {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null);
        navigate('/')
    }

  return (
    <div>
        <div className='flex justify-between items-center w-full h-[70px] py-2 px-4 sm:px-12 border-b border-gray-200 cursor-pointer'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-28 sm:w-44 cursor-pointer' />
            <button onClick={logout} className='bg-primary/90 hover:bg-primary px-6 sm:px-10 py-2.5 rounded-full text-sm text-white cursor-pointer'>
                Logout
            </button>
        </div>
        <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout
