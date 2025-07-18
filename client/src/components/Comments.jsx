import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import toastError from '../utils/toastError';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import Comment from './comment';
import { formatDistanceToNow } from 'date-fns';

const Comments = ({ close, postId }) => {
  const [commentText, setCommentText] = useState('');
  const user = useSelector((state)=>state.user)
  const [comments, setComments] = useState([])

  const handleComment = async ()=>{
    try {
        const res = await Axios({
            ...summaryApi.post_comment,
            data: {
                postId,
                textContent : commentText
            }
        })

        if (res.data.success) {
            setCommentText('')
            fetchComments()
        }
    } catch (error) {
        toastError(error)
    }
  }

  const fetchComments = async ()=>{
    try {
        const res = await Axios({
            ...summaryApi.fetch_comments,
            data: {
                postId : postId
            }
        })

        if (res.data.success) {
            setComments(res.data.comments)
        }
    } catch (error) {
        toastError(error)
    } 
  }

  useEffect(()=>{
    fetchComments()
  },[])

  return (
    <section className="fixed inset-0 z-70 bg-black/60 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] min-h-[90vh] overflow-hidden relative flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#0B3D26]">Comments</h2>
          <button onClick={close} className="text-gray-500 hover:text-gray-800 transition cursor-pointer">
            <IoClose size={28} />
          </button>
        </div>

        {/* Lista de comentários */}
        <div className="flex-1 overflow-y-auto mx-6 py-4 w-screen">
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
                />
            ))
            ) : (
            <p className="text-gray-500">No comments yet.</p>
            )
        }
        </div>


        {/* Área de envio de comentário */}
        <div className="border-t p-4 bg-white shadow-inner">
          <div className="flex items-start gap-3">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover mt-1"
            />
            <div className="flex-1">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0B3D26]"
                rows={3}
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="w-full flex items-center mt-2">
                <button
                    onClick={()=>handleComment()}
                  className="bg-[#0B3D26] text-white px-4 py-2 rounded-lg hover:bg-[#08311F] transition ml-auto cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Comments;
