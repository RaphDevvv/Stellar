import React, { useEffect, useState } from 'react';
import { MdAccountBox, MdHome, MdSearch, MdNotifications } from 'react-icons/md';
import { FiPlusSquare } from 'react-icons/fi';
import Post from '../components/Post';
import summaryApi from '../common/summaryapi';
import Axios from '../utils/axios';
import SubmitPost from '../components/SubmitPost';
import { formatDistanceToNow } from 'date-fns';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../store/NotificationsSlice';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [ratedPosts, setRatedPosts] = useState([]);
  const [commentNo, setCommentNo] = useState([]);
  const [openSubmitPost, setOpenSubmitPost] = useState(false);

  const notification = useSelector(state=>state.notification)

  const dispatch = useDispatch()

  const location = useLocation();

  const getPosts = async () => {
    try {
      const res = await Axios({ ...summaryApi.get_posts });
      if (res.data?.success) {
        setPosts(res.data?.posts);
        setRatedPosts(res.data?.ratedPosts);
        setCommentNo(res.data?.commentNo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfUnread = async () => {
    try {
      const res = await Axios({
        ...summaryApi.check_unread_notifications,
      });

      if (res.data.success) {
        dispatch(setNotifications({ hasUnread: res.data.hasUnread, unreadCount: res.data.unreadCount }))
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    checkIfUnread();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {openSubmitPost && (
        <SubmitPost close={() => setOpenSubmitPost(false)} refresh={() => getPosts()} />
      )}

      <div className="flex flex-1">
        {/* Left Sidebar (Desktop Only) */}
        <div className="bg-green-200 w-60 p-4 h-screen sticky top-0 hidden lg:block">
          <div className="space-y-4">
            <Link
              to={"/"}
              className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300"
            >
              <MdHome size={30} />
              <p className="font-medium">Home</p>
            </Link>

            <Link
              to={"/explore"}
              className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300"
            >
              <MdSearch size={30} />
              <p className="font-medium">Explore</p>
            </Link>

            <div
              onClick={() => setOpenSubmitPost(true)}
              className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300"
            >
              <FiPlusSquare size={30} />
              <p className="font-medium">Post</p>
            </div>

            <Link
              to={"/notifications"}
              className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white relative cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300"
            >
              <MdNotifications size={30} />
              <p className="font-medium">Notifications</p>
              {notification.hasUnread && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notification.unreadCount}
                </span>
              )}
            </Link>

            <Link
              to={"/profile"}
              className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300"
            >
              <MdAccountBox size={30} />
              <p className="font-medium">Profile</p>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 pb-20 lg:pb-4 w-screen">
          {location.pathname === "/" ? (
            posts.map((_) => {
              const userRating = ratedPosts.find((r) => r.postId === _._id);
              const commentCount = commentNo.find((c) => c.postId === _._id);
              const totalStars = _.stars.reduce((sum, star) => sum + star.stars, 0);

              return (
                <Post
                  key={_._id}
                  id={_._id}
                  avatar={_.userAvatar}
                  user={_.userName}
                  userId={_.userId}
                  textContent={_.textContent}
                  imageContent={_.imageContent}
                  time={formatDistanceToNow(new Date(_.createdAt), { addSuffix: true })}
                  imgContent=""
                  userStars={userRating?.stars || 0}
                  totalStars={totalStars}
                  commentNo={commentCount?.count || 0}
                />
              );
            })
          ) : (
            <Outlet />
          )}
        </div>
      </div>

      {/* Bottom Nav (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50">
        <div className="flex justify-around items-center h-16 relative">
          <Link to={"/"}>
            <MdHome size={28} className="text-[#0B3D26]" />
          </Link>
          <Link to={"/explore"}>
            <MdSearch size={28} className="text-[#0B3D26]" />
          </Link>

          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setOpenSubmitPost(true)}
              className="bg-[#0B3D26] text-white p-4 rounded-full shadow-lg"
            >
              <FiPlusSquare size={24} />
            </button>
          </div>

          <Link to={"/notifications"} className="relative">
            <MdNotifications size={28} className="text-[#0B3D26]" />
            {notification.hasUnread && (
              <span className="absolute -top-0 -right-0 bg-red-500 w-3 h-3 rounded-full"></span>
            )}
          </Link>

          <Link to={"/profile"}>
            <MdAccountBox size={28} className="text-[#0B3D26]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
