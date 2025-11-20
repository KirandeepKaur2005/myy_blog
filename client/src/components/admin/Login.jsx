import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const {axios, setToken} = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/admin/login', {email, password});
      // console.log("data: ", data)
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error while logging in: ", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='px-5 py-5 w-full max-w-sm sm:shadow sm:shadow-primary/20 sn:border sm:border-gray-200 rounded'>
        <div className='text-center my-6 px-3'>
          <div className='font-bold text-2xl'><span className='text-primary'>Admin</span> Login</div>
          <p className=''>Enter your credentials to access the admin panel</p>
        </div>

        <form action="" onSubmit={handleSubmit} className='px-8 flex flex-col gap-5 my-5'>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor="email">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='px-3 py-1 outline-none border-b border-gray-200' placeholder='your email id' type="text" id='email' />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor="password">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='px-3 py-1 outline-none border-b border-gray-200' placeholder='your password' type="text" id='password' />
          </div>
          <button type='submit' className='bg-primary/90 text-white px-3 py-2 rounded hover:bg-primary'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
