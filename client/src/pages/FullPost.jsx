import React, { useEffect, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import toastError from '../utils/toastError';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import { Link, useLocation } from 'react-router-dom';
import Comment from '../components/Comment';

const StarRating = ({ size, postId, userStar, setCurrentStars }) => {
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(userStar || 0);

  const handleRate = async (selectedRating) => {
    try {
      const res = await Axios({
        ...summaryApi.rate_posts,
        data: {
          postId: postId,
          stars: selectedRating,
        },
      });
      setRating(selectedRating);

      if (res.data.success) {
        const variation = selectedRating - rating
        setCurrentStars(prev=>prev+variation)
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hovered >= star || (!hovered && rating >= star);

        return (
          <span
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => {
              const newRating = rating === star ? 0 : star;
              handleRate(newRating);
            }}
          >
            {filled ? (
              <FaStar size={size} className="text-[#0B3D26]" />
            ) : (
              <FaRegStar size={size} className="text-[#0B3D26]" />
            )}
          </span>
        );
      })}
    </div>
  );
};

const FullPost = () => {
  const [post, setPost] = useState({});
  const [userStar, setUserStar] = useState(null);
  const [commentNo, setCommentNo] = useState(0);
  const [currentStars, setCurrentStars] = useState(0)
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([])
  const location = useLocation();

  const id = location.pathname.split("/").pop();

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.get_posts_by_id,
        data: { id: id },
      });

      if (res.data.success) {
        setPost(res.data.post);
        setUserStar(res?.data?.userStar?.stars || 0);
        setCommentNo(res.data.commentNo);
        setCurrentStars(res?.data?.post?.stars.reduce((sum, star) => sum + star.stars, 0))
        fetchComments(res.data.post._id)
      }
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };
   const fetchComments = async (id)=>{
      try {
          const res = await Axios({
              ...summaryApi.fetch_comments,
              data: {
                  postId : id
              }
          })
  
          if (res.data.success) {
              setComments(res.data.comments)
          }
      } catch (error) {
          toastError(error)
      } 
    }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      {!loading && (
        <div>
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 max-w-[50rem]">
          {/* Top user info */}
          <div className="flex items-center gap-2">
            <Link to={`/profile/${post.userId}`} className="bg-[#0B3D26] w-12 h-12 rounded-full">
              <img src={post?.userAvatar} className="rounded-full w-full h-full" />
            </Link>
            <div>
              <Link to={`/profile/${post.userId}`} className="font-medium">{post?.userName}</Link>
              {post?.createdAt && (
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              )}
            </div>
          </div>

          {/* Text content */}
          {post.textContent && (
            <p className="mt-2 text-lg break-words whitespace-pre-wrap ">{post?.textContent}</p>
          )}

          {/* Image content */}
          {post.imageContent && (
            <div className="lg:w-[50%] w-full max-h-96 overflow-hidden my-4">
              <img
                src={post?.imageContent}
                alt="Post content"
                className="md:max-w-96 max-w-full max-h-96 rounded-xl"
              />
            </div>
          )}

          {/* Bottom actions */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">

              <div className="hidden md:block cursor-pointer">
                <StarRating size={30} postId={id} userStar={userStar} setCurrentStars={setCurrentStars}
                />
              </div>

              <div className="md:hidden cursor-pointer">
                <StarRating size={25} postId={id} userStar={userStar} setCurrentStars={setCurrentStars}/>
              </div>


              <div className="flex items-center gap-1 text-[#0B3D26] font-semibold text-md bg-[#E6F2ED] border border-[#0B3D26] px-3 py-1 rounded-full shadow-sm">
                <span>{currentStars}</span>
              </div>
            </div>

            <div className="flex items-center justify-center font-medium px-3 py-2 rounded-md gap-2 text-[#0B3D26] bg-green-100 hover:shadow-lg transition-all duration-300">
              <MdMessage size={20} />
              {commentNo}
            </div>
          </div>
        </div>
               <div className="flex-1 overflow-y-auto p-4 ">
        {
            comments.length > 0 ? (
            comments.map((_, index) => (
                <Comment
                key={index}
                userId={_.userId}
                userAvatar={_.userAvatar}
                userName={_.userName}
                textContent={_.textContent}
                time={formatDistanceToNow(new Date(_.createdAt), { addSuffix: false })}
                white={true}
                />
            ))
            ) : (
            <p className="text-gray-500">No comments yet.</p>
            )
        }
        </div>
          </div>
        
      )}
    </div>
  );
};

export default FullPost;
