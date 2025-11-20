import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { marked } from 'marked';


const AddBlog = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const categories = blogCategories;

  const {axios} = useAppContext();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('subTitle', subTitle);
      formData.append('description', quillRef.current.root.innerHTML);
      formData.append('category', category);
      formData.append('isPublishedReq', JSON.stringify({ isPublished: isPublished }));

      const {data} = await axios.post('/api/blog/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if(data.success) {
        toast.success('Blog added successfully');
        setImage(false);
        setTitle('');
        setSubTitle('');
        setCategory('Startup');
        setIsPublished(false);
        console.log("content: ", quillRef.current.root.innerHTML)
        quillRef.current.root.innerHTML = '';
      } 
      else{
        console.log("data.message: ", data.message);
        toast.error(data.message);
      }

    } catch (error) {
      console.log("error.message: ", error.message);
      toast.error(error.message);
    } finally {
      setIsAdding(false)   
    }

  }

  const generateContent = async() => {
    if (!title) return toast.error('Please enter a title');

    try {
      setLoading(true);
      const {data} = await axios.post('/api/blog/generate', {prompt: title});
      if (data.success){
        quillRef.current.root.innerHTML = marked.parse(data.content);;
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    // Initiate quill only once
    if (!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  }, [])

  return (
    <div className='flex-1 bg-blue-50/50 h-full overflow-scroll rounded-lg'>
      <form onSubmit={handleSubmit} className='bg-white shadow max-w-4xl w-full rounded-lg p-4 md:p-10 sm:m-10'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="image" className='mt-2 h-16 rounded cursor pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <p htmlFor="title" className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' id="title" className='w-full max-w-lg mt-2 p-2 border border-gray-200 outline-none rounded' value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <p htmlFor="subtitle" className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' id="subtitle" className='w-full max-w-lg mt-2 p-2 border border-gray-200 outline-none rounded' value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />

        <p htmlFor="subtitle" className='mt-4'>Blog description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-5 pt-2 relative'>
          <div ref={editorRef} ></div>
          <button disabled={loading} className='absolute -bottom-7 right-0  sm:-bottom-5 sm:right-1 text-xs bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded cursor-pointer' type='button' onClick={generateContent}>
            {loading ? 'Generating...' : 'Generate content'}
          </button>
        </div>

        <p className='mt-10 sm:mt-7'>Blog Category</p>
        <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" id="category" className='mt-2 px-3 py-2 border border-gray-300 text-gray-500 outline-none rounded'>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <div className='mt-4 flex gap-4'>
          <p>Publish Now</p>
          <input type='checkbox' checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className='scale-125 cursor-pointer'/>
        </div>

        <button disabled={isAdding} type="submit" className='mt-6 px-6 py-2 bg-primary/90 hover:bg-primary rounded text-white cursor-pointer'>{isAdding ? 'Adding...' : 'Add blog'}</button>
      </form>
    </div>
  )
}

export default AddBlog
