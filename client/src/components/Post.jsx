import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa6";
import { MdMessage } from 'react-icons/md';
import summaryApi from '../common/summaryapi';
import Axios from '../utils/axios';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const StarRating = ({ size = 30, postId, userStars, onRate}) => {
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(userStars);

  const handleRate = async (selectedRating) => {
    try {
      await Axios({
        ...summaryApi.rate_posts,
        data: {
          postId: postId,
          stars: selectedRating,
        },
      });

        if (onRate) {
        const previousRating = rating;
        const newRating = selectedRating;
        const actualNewRating = previousRating === newRating ? 0 : newRating;
        onRate(actualNewRating, previousRating || 0);
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
              setRating(newRating);
              handleRate(newRating);
            }}
            className="cursor-pointer transition-transform hover:scale-110"
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

const Post = ({ avatar ,id, user, userId, time, textContent, imageContent, totalStars, userStars }) => {
    const [currentTotalStars, setCurrentTotalStars] = useState(totalStars);
    const [openComments, setOpenComments] = useState(false)
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4 max-w-[50rem]">
      {/* Top user info */}
      <div className="flex items-center gap-2">
        <Link to={`/profile/${userId}`} className="bg-[#0B3D26] w-12 h-12 rounded-full"> <img
        src={avatar}
        className='rounded-full w-full h-full'
        /> </Link>
        <div>
          <Link to={`/profile/${userId}`} className="font-medium">{user}</Link>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>

      {/* Text content */}
      {textContent && <p className="mt-2 text-lg break-words whitespace-pre-wrap ">{textContent}</p>}


      {/* Image content */}
      {imageContent && (
        <div className="lg:w-[50%] w-full max-h-96 overflow-hidden my-4">
          <img src={imageContent} alt="Post content" className="md:max-w-96 max-w-full max-h-96 rounded-xl" />
        </div>
      )}

      {/* Bottom actions */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Star rating */}
          <div className="hidden md:block">
            <StarRating size={30} postId={id} userStars={userStars} 
                onRate={(newRating, previousRating) => {
    const diff = newRating - previousRating;
    setCurrentTotalStars(prev => prev + diff);}}
            />
          </div>
          <div className="md:hidden">
            <StarRating size={25} postId={id} userStars={userStars}                 onRate={(newRating, previousRating) => {
    const diff = newRating - previousRating;
    setCurrentTotalStars(prev => prev + diff);}}/>
          </div>

          <div className="flex items-center gap-1 text-[#0B3D26] font-semibold text-md bg-[#E6F2ED] border border-[#0B3D26] px-3 py-1 rounded-full shadow-sm">
            <span>{currentTotalStars}</span>
          </div>
        </div>

        <button 
        onClick={()=>setOpenComments(true)}
        className="flex items-center justify-center font-medium text-white bg-[#0B3D26] px-3 py-2 rounded-md gap-2 hover:text-[#0B3D26] hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
          <MdMessage size={20} />
          Comments
        </button>
      </div>
      {
        openComments && <Comments postId={id} close={()=>setOpenComments(false)}/>
      }
    </div>

    
  );
};

export default Post;
