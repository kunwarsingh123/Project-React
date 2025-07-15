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
      <div className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200">
        <div className="w-full aspect-video overflow-hidden rounded-xl mb-4">
          <img
            src={service.getFileView(featuredImage)}
            alt={title}
            title={title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-800 truncate">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
