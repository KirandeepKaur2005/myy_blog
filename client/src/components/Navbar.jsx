import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const {navigate, token} = useAppContext()

  return (
    <div className='flex justify-between items-center py-5 mx-5 sm:mx-20 xl:mx:32 cursor-pointer'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-28 sm:w-44 cursor-pointer' />
      <button onClick={() => navigate('/admin')} className='flex items-center gap-2 bg-primary px-3 sm:px-10 py-2.5 rounded-full text-sm text-white cursor-pointer'>
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="arrow" className='w-3' />
      </button>
    </div>
  )
}

export default Navbar
