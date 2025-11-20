import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
    const {title, description, category, image, _id} = blog;
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/blog/get/${_id}`)} className='w-full rounded-lg shadow overflow-hidden cursor-pointer duration-300 hover:scale-102 hover:shadow-primary/25'>
      <img src={image} alt="" className='aspect-video' />
      <span className='text-primary px-3 py-1 mx-5 inline-block mt-4 rounded-full bg-primary/20 text-xs'>{category}</span>
      <div className='px-4 py-5'>
        <h5 className='font-medium text-gray-900 mb-2'>{title}</h5>
        <p className='text-gray-600 mb-3 text-xs' dangerouslySetInnerHTML={{"__html": description.slice(0,80)}}></p>
      </div>
    </div> 
  )
}

export default BlogCard
