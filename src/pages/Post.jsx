import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function Post() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        } else {
          navigate('/');
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate('/');
      }
    });
  };

  return post ? (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        {/* Image + Buttons */}
        <div className="w-full flex justify-center mb-8 relative border border-gray-300 rounded-2xl shadow-lg p-4 bg-white">
          <img
            src={service.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-[450px] w-full object-contain"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {post.title}
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
