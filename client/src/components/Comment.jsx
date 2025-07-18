import React from 'react'
import { Link } from 'react-router-dom'

const Comment = ({ userAvatar, userName, textContent, time, userId }) => {
    return (
        <div className=''>
            <div className="flex gap-3 items-start mb-6">
                
                <Link to={`/profile/${userId}`}>
                <img
                    src={userAvatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />
                </Link>
                <div className="flex-1 bg-[#F3F7F5] p-4 rounded-xl shadow-sm max-w-[35rem]">
                    <div className="flex justify-between items-center mb-1">
                        <Link  to={`/profile/${userId}`} className="font-semibold text-[#0B3D26]">{userName}</Link>
                        <p className="text-sm text-gray-500">{time}</p>
                    </div>
                    <p className="text-gray-800 mb-2 break-words whitespace-pre-wrap">
                        {textContent}
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default Comment
