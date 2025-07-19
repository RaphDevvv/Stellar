import React, { useEffect, useState } from 'react';
import { MdAccountBox, MdHome, MdSearch, MdNotifications } from 'react-icons/md';
import { FiPlusSquare } from 'react-icons/fi';
import Post from '../components/Post';
import summaryApi from '../common/summaryapi';
import Axios from '../utils/axios';
import SubmitPost from '../components/SubmitPost';
import { formatDistanceToNow } from 'date-fns';
import { Link, Outlet, useLocation } from 'react-router-dom';
import toastError from '../utils/toastError';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [ratedPosts, setRatedPosts] = useState([])
  const [openSubmitPost, setOpenSubmitPost] = useState(false)
  const [nolog,setNolog] = useState(false)

  const location = useLocation()
  
  const getPosts = async () => {
    try {
      const res = await Axios({ ...summaryApi.get_posts });
      if (res.data?.success) {
        setPosts(res.data?.posts);
        setRatedPosts(res.data?.ratedPosts)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    
    <div className="min-h-screen flex flex-col">
      {openSubmitPost && <SubmitPost close={() => setOpenSubmitPost(false)} refresh={()=>{getPosts()}} />}
      <div className="flex flex-1">
        {/* Left Sidebar (Desktop Only) */}
        <div className="bg-green-200 w-60 p-4 h-screen sticky top-0 hidden lg:block">
          <div className="space-y-4">

            
            {/* Home Button */}
            <Link to={"/"} className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300">
              <MdHome size={30} />
              <p className="font-medium">Home</p>
            </Link>

            {/* Explore Button */}
            <Link to={"/explore"} className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300">
              <MdSearch size={30} />
              <p className="font-medium">Explore</p>
            </Link>

            {/* Post Button */}
            <div 
            onClick={()=>setOpenSubmitPost(true)}
            className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300">
              <FiPlusSquare size={30} />
              <p className="font-medium">Post</p>
            </div>

            {/* Notifications Button */}
            <div className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300">
              <MdNotifications size={30} />
              <p className="font-medium">Notifications</p>
            </div>

            {/* Account Button */}
            <Link to={"/profile"} className="flex items-center p-3 gap-2 bg-[#0B3D26] text-white cursor-pointer shadow-sm rounded-lg hover:bg-white hover:text-[#0B3D26] transition duration-300">
              <MdAccountBox size={30} />
              <p className="font-medium">Profile</p>
            </Link>
          </div>

        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 pb-20 lg:pb-4 w-screen">
          {location.pathname === "/" ? (
            posts.map(_ => {
              const userRating = ratedPosts.find(r => r.postId === _._id);
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
          <Link to={"/explore"}><MdSearch size={28} className="text-[#0B3D26]" /></Link>

          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <button 
             onClick={()=>setOpenSubmitPost(true)}
            className="bg-[#0B3D26] text-white p-4 rounded-full shadow-lg">
              <FiPlusSquare size={24} />
            </button>
          </div>

          <MdNotifications size={28} className="text-[#0B3D26]" />
          <Link to={"/profile"}><MdAccountBox size={28} className="text-[#0B3D26]" /></Link>
        </div>
      </div>
    </div>

    

  );
};

export default Home;
