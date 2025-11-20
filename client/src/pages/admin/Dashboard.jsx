import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0, 
    recentBlogs: []
  })

  const {axios} = useAppContext();

  const fetchDashboard = async() => {
    try {
      const {data} = await axios.get('/api/admin/dashboard');
      if (data.success){
        setDashboardData(data.dashboardData);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, [])

  return (
    <div className='flex-1 bg-blue-50/50 sm:p-5 md:p-10 p-3 '>
      <div className='flex flex-wrap gap-5'>
        <div className='bg-white rounded shadow flex gap-4 px-4 py-3 min-w-[70vw] sm:min-w-58 cursor-pointer hover:scale-105 duration-300 ease-in-out'>
          <img src={assets.dashboard_icon_1} alt="blog" />
          <div>
            <p className='text-gray-800 font-semibold text-xl'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>
        <div className='bg-white rounded shadow flex gap-4 px-4 py-3 min-w-[70vw] sm:min-w-58 cursor-pointer hover:scale-105 duration-300 ease-in-out'>
          <img src={assets.dashboard_icon_2} alt="comm" />
          <div>
            <p className='text-gray-800 font-semibold text-xl'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>
        <div className='bg-white rounded shadow flex gap-4 px-4 py-3 min-w-[70vw] sm:min-w-58 cursor-pointer hover:scale-105 duration-300 ease-in-out'>
          <img src={assets.dashboard_icon_3} alt="draft" />
          <div>
            <p className='text-gray-800 font-semibold text-xl'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex gap-3 items-center m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className='relative bg-white shadow max-w-4xl rounded-lg overflow-x-auto cal'>
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
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
