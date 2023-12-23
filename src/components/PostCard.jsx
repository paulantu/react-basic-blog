import React from 'react'
import appWriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, thumbnail, excerpt}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appWriteService.getFilePreview(thumbnail)} alt={title} className='rounded-xl' />
            </div>
            <h2 className='text-lg font-bold'>
                {title}
            </h2>
            <p className='text-sm'>
                {excerpt}
            </p>
        </div>

    </Link>
  )
}

export default PostCard