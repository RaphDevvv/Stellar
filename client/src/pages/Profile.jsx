import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdModeEdit } from "react-icons/md";
import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import uploadImage from '../utils/uploadImage';
import { updateAvatar } from '../store/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import Post from '../components/Post';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Account from '../components/Account';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [ratedPosts, setRatedPosts] = useState([])
  const [account, setOpenAccount] = useState(false)
  const navigate = useNavigate()


  const fetchPosts = async () => {
    try {
      const res = await Axios({
        ...summaryApi.get_user_posts
      })

      if (res.data.success) {
        setPosts(res.data.userPosts)
        setRatedPosts(res.data.ratedPosts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      const res = await Axios({
        ...summaryApi.logout
      })

      if (res.data.success) {
        navigate("/auth")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()

    console.log(posts)
  }, [])

  return (
    <div className="min-h-screen bg-[#F3F7F5]">
      {
        account && <Account close={()=>setOpenAccount(false)}/>
      }
      
      {/* Banner + Avatar */}
      <div>

        <div className="lg:w-32 lg:h-32 w-28 h-28 mt-10 mx-auto rounded-full bg-[#0B3D26] text-white flex items-center justify-center text-3xl font-bold relative">
          <img
            src={user.avatar}
            className='w-full h-full rounded-full'
          />

          <div
            onClick={()=>setOpenAccount(true)}
            className='bg-white shadow-lg p-1 rounded-full absolute mt-20 ml-20 cursor-pointer hover:bg-gray-300'
          >
            <MdModeEdit size={23} className='text-green-900' />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-5 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 break-words">{user?.name || 'User'}</h2>
        <button onClick={logout}>
          log out
        </button>
      </div>

      {/* Posts */}
      <div className="mt-10  max-w-3xl mx-auto space-y-6 pb-10">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 text-left">Posts</h3>

        {
          posts.map(_ => {
            const userRating = ratedPosts.find(r => r.postId === _._id);
            const totalStars = _.stars.reduce((sum, star) => sum + star.stars, 0);
            return (
              <Post
                key={_._id}
                id={_._id}
                avatar={_.userAvatar}
                user={_.userName}
                textContent={_.textContent}
                imageContent={_.imageContent}
                time={formatDistanceToNow(new Date(_.createdAt), { addSuffix: true })}
                imgContent=""
                userStars={userRating?.stars || 0}
                totalStars={totalStars}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Profile;
