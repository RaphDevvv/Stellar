import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../store/NotificationsSlice';

const Notification = ({ id, message, postId, type, fromUser, createdAt, isRead, commentText, postPicture }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const notification = useSelector(state=>state.notification)
  
  const notificationClick = async ()=>{
    try {
      const res = await Axios({
        ...summaryApi.set_as_read,
        data: {
          id: id
        }
      })

      if (res.data.success) {
        dispatch(setNotifications({
        hasUnread: notification.unreadCount - 1 > 0,
        unreadCount: notification.unreadCount - 1
      }));
        navigate(`/post/${postId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div
      onClick={()=>notificationClick()}
      className={`w-full max-w-2xl rounded-2xl px-5 py-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
        ${isRead ? 'bg-slate-200' : 'bg-white border-l-4 border-[#0B3D26]'}`}
    >
      {/* Avatar */}
      <img
        src={fromUser.avatar}
        alt={`${fromUser.name} avatar`}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Main Content */}
      <div className="flex flex-col text-sm text-gray-800 flex-1">
        <p className="leading-snug">
          <span className="font-semibold mr-1">{fromUser.name}</span>
          {message}
        </p>

        {commentText && (
          <p className=" text-gray-600 italic text-sm py-2 rounded-md">
            “{commentText.slice(0, 30)}...”
          </p>
        )}

        {postPicture && (
          <img
            src={postPicture}
            alt="Post"
            className="w-28 h-28 mt-3 rounded-lg object-cover border"
          />
        )}

        <span className="text-xs text-gray-500 mt-2">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>

    </div>
  );
};

export default Notification;
