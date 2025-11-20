import React from 'react'
import Moment from 'moment'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog, fetchBlogs, index}) => {
  const {title, createdAt, isPublished, _id} = blog;
  console.log("id: ", _id);
  const BlogDate = Moment(createdAt).format('MMMM Do YYYY');

  const {axios} = useAppContext();

  const togglePublish = async() => {
    try {
      const {data} = await axios.post('/api/blog/toggle-isPublished', {id: _id});
      if (data.success){
        toast.success(data.message);
        await fetchBlogs();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteBlog = async() => {
    const confirm = window.confirm('Are you sure you want to delete blog?')
    if (!confirm) return;
    try {
      const {data} = await axios.post('/api/blog/delele-blog', {id: _id});
      if (data.success){
        toast.success(data.message);
        await fetchBlogs();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index+1}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${isPublished ? 'text-green-600' : 'text-orange-700'}`}>{isPublished ? 'Published' : 'Unpublished'}</p>
      </td>
      <td className='px-2 py-4 flex items-center flex-col lg:flex-row gap-2 lg:gap-5'>
        <button onClick={togglePublish} className='border border-gray-500 rounded px-2 py-1 hover:bg-gray-100 cursor-pointer'>{isPublished ? 'Unpublish' : 'Publish'}</button>
        <img onClick={deleteBlog} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" />
      </td>
    </tr>
  )
}

export default BlogTableItem
