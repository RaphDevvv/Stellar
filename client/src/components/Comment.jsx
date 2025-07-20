import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ userAvatar, userName, textContent, time, userId, white }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-3 items-start mb-6 w-full">
        
        {/* Avatar */}
        <Link to={`/profile/${userId}`} className="flex-shrink-0 bg-[#08311F] rounded-full">
          <img
            src={userAvatar}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>

        {/* Comment Box */}
        <div
          className={`flex-1 min-w-0 ${white ? "bg-white" : "bg-[#F3F7F5]"} p-4 rounded-xl shadow-sm w-full max-w-[35rem]`}
        >
          <div className="flex justify-between items-center mb-1">
            <Link
              to={`/profile/${userId}`}
              className="font-semibold text-[#0B3D26] break-words max-w-[10rem] md:max-w-full"
            >
              {userName}
            </Link>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
          <p className="text-gray-800 mb-2 break-words whitespace-pre-wrap overflow-x-auto">
            {textContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
