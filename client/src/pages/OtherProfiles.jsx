import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { formatDistanceToNow } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OtherProfiles = () => {
  const [posts, setPosts] = useState([]);
  const [ratedPosts, setRatedPosts] = useState([]);
  const [user, setUser] = useState();
  const [following, setFollowing] = useState(false)
  const [mySelf, setMySelf] = useState(false)
  const me = useSelector((state) => state.user);

  const location = useLocation();
  const userId = location.pathname.split("/").pop();

  const getInfo = async () => {
    try {
      const res = await Axios({
        ...summaryApi.info_by_name,
        data: {
          id: userId
        }
      });

      if (res.data.success) {
        setPosts(res.data.userPosts);
        setUser(res.data.user);
        setRatedPosts(res.data.ratedPosts);
        if (res.data.user.followers.includes(me._id)) {
            setFollowing(true)
        }

        if (res.data.user._id === me._id) {
            setMySelf(true)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async ()=>{
    try {
        const res = await Axios({
            ...summaryApi.follow_user,
            data: {
                id: userId
            }
        })

        if (res.data.success) {
            getInfo()
            setFollowing(prev=>!prev)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F7F5]">
      
      {/* Banner + Avatar */}
      <div>
        <div className="lg:w-32 lg:h-32 w-28 h-28 mt-10 mx-auto rounded-full bg-[#0B3D26] text-white flex items-center justify-center text-3xl font-bold relative shadow-md">
          <img
            src={user?.avatar}
            className='w-full h-full rounded-full object-cover'
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-5 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 break-words">{user?.name}</h2>

        {/* Followers Count */}
        <p className="text-sm text-gray-500 mt-1">
          {user?.followers?.length || 0} Followers
        </p>

        {/* Follow Button (style only) */}
        {
            mySelf ? "" :         <button
            onClick={handleFollow}
          className={`mt-3 px-4 py-2 rounded-full font-medium cursor-pointer  ${following ? "bg-white text-[#0B3D26] hover:bg-gray-200 border-2 border-[#0B3D26]" : "bg-[#0B3D26] text-white hover:bg-[#0d5233] border-2 "} transition duration-200 shadow`}
        >
          {following ? "unfollow" : "follow"}
        </button>
        }
      </div>

      {/* Posts */}
      <div className="mt-10 max-w-3xl mx-auto space-y-6 pb-10">
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

export default OtherProfiles;
