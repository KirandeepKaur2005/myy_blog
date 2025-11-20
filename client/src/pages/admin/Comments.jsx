import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState(true)

  const {axios} = useAppContext();

  const fetchComments = async() => {
    try {
      const {data} = await axios.get('/api/admin/comments');
      console.log(data)
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

  const approveComment = async(id) => {
    try {
      const {data} = await axios.post('/api/admin/approve-comment', {id: id});
      if (data.success){
          fetchComments();
          toast.success(data.message)
      }
      else{
          toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteComment = async(id) => {
    try {
      const {data} = await axios.post('/api/admin/delete-comment', {id: id});
      if (data.success){
          fetchComments();
          toast.success(data.message)
      }
      else{
          toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments();
  }, [])

  // const deleteComment = (id) => {
  //   setComments(prevComments => prevComments.filter(comment => comment._id !== id));
  // }
  
  return (
    <div className='flex-1 bg-blue-50/50 p-3 sm:p-5 md:p-10'>
      <div>
        <div className='flex justify-between max-w-4xl'>
          <h1>Comments</h1>
          <div className='flex gap-5'>
            <button onClick={()=>setFilter(true)} className='bg-green-500 hover:bg-green-600 text-white rounded-lg px-2 py-1'>Approved</button>
            <button onClick={()=>setFilter(false)} className='bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-1'>Not Approved</button>
          </div>
        </div>
        <div className='relative h-4/5 mt-4 bg-white shadow max-w-4xl rounded-lg scrollbar-hide overflow-x-auto'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left'>
              <tr className=''>
                <th scope='col' className='px-6 py-3 font-semibold uppercase'>Blog title and comment</th>
                <th scope='col' className='px-6 py-3 max-sm:hidden font-semibold uppercase'>Date</th>
                <th scope='col' className='px-6 py-3 font-semibold uppercase'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 && comments.filter(comment => comment.isApproved === filter).map((comment, index) => (
                <CommentTableItem key={index} approveComment={approveComment} deleteComment={deleteComment} comment={comment} id={comment._id}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Comments
