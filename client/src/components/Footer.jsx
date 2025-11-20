import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-full bg-primary/3 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row gap-10 items-start justify-between py-10 border-b border-gray-500/30 text-gray-500'>
        <div>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
            <p className='max-w-[410px] mt-6 text-gray-500 text-sm'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident iste, repellendus culpa minima nisi beatae doloribus voluptates quaerat hic eos repellat praesentium magni dolores sequi veritatis? Natus vitae nesciunt esse.
            </p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((data, index) => (
                <div key={index}>
                    <h3 className='text-gray-900 font-semibold text-base md:mb-5 mb-2'>{data.title}</h3>
                    <ul className='text-sm space-y-1'> 
                        {data.links.map((link, i) => (
                            <li key={i}>
                                <a href="#" className='hover:underline transition'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>

      <p className='py-4 text-center text-gray-500 md:text-base text-sm'>
        Copyright 2025 c MyBlog All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
