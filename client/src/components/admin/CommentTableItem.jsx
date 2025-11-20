import Moment from 'moment';
import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, approveComment, deleteComment, id}) => {
    const {blog, name, content, isApproved, createdAt} = comment;
    const commentDate = Moment(createdAt).format('MMMM Do YYYY');

  return (
    <tr className='border-y border-gray-300 '>
        <td className='px-6 py-3'>
            <p><b>Blog: </b>{blog.title}</p>
            <br />
            <div>
                <p><b>Name: </b>{name}</p>
                <p><b>Comment: </b>{content}</p>
            </div>
        </td>
        <td className='max-sm:hidden'>{commentDate}</td>
        <td className='flex flex-col sm:flex-row gap-5 px-6 py-3 '>
            {
                !isApproved && <button>
                    <img onClick={()=>approveComment(id)} src={isApproved ? assets.cross_icon : assets.tick_icon} className='w-7 hover:scale-102 cursor-pointer' alt="Approved" />
                </button>
            }   
            <button onClick={()=>deleteComment(id)} className='cursor-pointer'><img src={assets.bin_icon} className='w-7 hover:scale-102 cursor-pointer' alt="delete" /></button>
        </td>
    </tr>
  )
}

export default CommentTableItem
