import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  // Optional: check if values exist
  if (!featuredImage || !$id || !title) {
    return null; // or show a fallback UI
  }
  console.log("Image file ID:", featuredImage);
console.log("Preview URL:", service.getFilePreview(featuredImage));


  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition duration-300'>
        <div className='w-full flex justify-center mb-4'>
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className='rounded-xl max-h-60 object-cover'
          />
        </div>
        <h2 className='text-xl font-bold text-center truncate'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
