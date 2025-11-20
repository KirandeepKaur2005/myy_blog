import React from 'react'

const Newsletter = () => {
  return (
    <div className='text-center mb-10 sm:mb-32'>
      <h1 className='text-2xl md:text-4xl font-semibold mb-3'>Never miss a Blog!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subsrcibe to get the latest eg, new tech, and exclusive news.</p>
      <form className='flex justify-between items-center overflow-hidden border border-gray-200 w-full max-w-2xl mx-auto rounded'>
        <input type="text" placeholder='Enter your email id' className='px-3 w-full outline-none' required />
        <button type='submit' className='bg-primary/80 hover:bg-primary transition-all cursor-pointer text-white px-5 py-3 text-xs'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default Newsletter
