import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const ListBlog = () => {

  const [blogs, setBlogs] = useState([]);
  
  const {axios} = useAppContext();

  const fetchBlogs = async() => {
    try {
      const {data} = await axios.get('/api/admin/blogs');
      if (data.success){
        console.log(data.blogs);
        setBlogs(data.blogs);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 bg-blue-50/50 p-3 sm:p-5 md:p-10 '>
      <h1>All Blogs</h1>

      <div className='relative  mt-4 bg-white shadow max-w-4xl rounded-lg scrollbar-hide overflow-x-auto'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left'>
            <tr className=''>
              <th scope='col' className='px-2 py-4 xl:px-6 font-semibold'>#</th>
              <th scope='col' className='px-2 py-4 font-semibold'>BLOG TITLE</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden font-semibold'>DATE</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden font-semibold'>STATUS</th>
              <th scope='col' className='px-2 py-4 font-semibold'>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog
