import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, blog_data, comments_data } from '../assets/assets'
import { useParams } from 'react-router-dom'
import Moment from 'moment'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const {axios} = useAppContext();

  const fetchBlogData = async() => {
    try {
      const {data} = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchComments = async() => {
    try {
      const {data} = await axios.post('/api/blog/get-blog-comments', {blogId: id});
      if (data.success){
        setComments(data.comments);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if (data.success){
        toast.success(data.message);
        setName('');
        setContent('');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [])

  if (data == null) return <Loader />

  return (
    <div className='relative'>

      <img src={assets.gradientBackground} alt="bg" className='absolute top-10 sm:-top-50 -z-1 opacity-75' />

      <Navbar />

      <div className='text-center my-10 lg:my-20 max-w-2xl mx-auto space-y-2 lg:space-y-3'>
        <p className='font-medium text-primary'>Published on {Moment(data['createdAt']).format('MMMM Do YYYY')}</p>
        <h2 className='px-2 text-3xl sm:font-4xl lg:text-5xl text-gray-800 font-semibold '>{data.title}</h2>
        <h3 className='px-2 max-w-lg mx-auto truncate text-gray-600'>{data.subTitle}</h3>
        <p className='inline-block text-sm text-primary font-medium bg-primary/5 border border-primary/35 rounded-full px-4 py-1 mb-6 '>Michael Brown</p>
      </div>

      <div className='max-w-5xl mx-auto px-3 my-10 mt-6'>
        <img src={data.image} alt="img" className='rounded-3xl mb-5 max-h-xl' />
        <div className='rich-text max-w-4xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

        {/* comments data */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.length > 0 && comments.map((item, index) => (
              <div key={index} className='flex justify-between bg-primary/2 border border-primary/5 px-4 py-2 rounded text-gray-600 p-4'>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <img src={assets.user_icon} alt="user icon" className='w-6'/>
                    <p className='font-medium'>{item.name}</p>
                  </div>
                  <p className='text-sm max-w-md ml-8 '>{item.content}</p>
                </div>
                <div className='flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add comment section */}
      <div className='max-w-3xl mx-auto px-3'>
          <p className='font-semibold mb-4'>Add your comment</p>
          <form onSubmit={addComment} action='' className='space-y-3 mb-10'>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' className='w-full border border-gray-300 px-3 py-1 rounded' required/>
              <textarea onChange={(e)=>setContent(e.target.value)} value={content} type="text" placeholder='Comment' className='w-full border border-gray-300 px-3 py-2 rounded outline-none h-30 sm:h-48' required/>
              <button type='submit' className='bg-primary text-white rounded px-8 py-2 hover:scale-102 transition-all cursor-pointer outline-none'>Submit</button>
          </form>
      </div>

      {/* Share buttons */}
      <div className='my-12 sm:my-24 max-w-3xl mx-auto px-3'>
          <p className='font-semibold my-4'>Share this text on Social Media</p>
          <div className='flex gap-3'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
      </div>

      <Footer />
    </div>
  )
}

export default Blog
