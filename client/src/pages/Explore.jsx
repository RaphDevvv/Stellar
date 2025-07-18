import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import summaryApi from '../common/summaryapi';
import Post from '../components/Post';
import Axios from '../utils/axios';
import { FaStar } from 'react-icons/fa';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [ratedPosts, setRatedPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await Axios({ ...summaryApi.most_liked_posts });
      if (res.data.success) {
        setPosts(res.data.posts);
        setRatedPosts(res.data.ratedPosts);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="min-h-screen bg-white p-4 lg:px-16">
      {/* Header */}
      <header className="mb-8 flex items-center gap-3 text-[#0B3D26] select-none">
        <FaStar size={28} className="text-yellow-500" />
        <h2 className="text-3xl font-extrabold">Most Liked</h2>
      </header>

      {/* Posts Feed */}
      <section className="space-y-10">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No posts found yet.
          </p>
        ) : (
          posts.map(post => {
            const userRating = ratedPosts.find(r => r.postId === post._id);
            const totalStars = post.stars.reduce((sum, star) => sum + star.stars, 0);

            return (
              <article
                key={post._id}
                className="bg-white rounded-2xl shadow-md border border-[#0B3D26] p-4 max-w-[50rem] hover:shadow-lg transition-shadow duration-300"
              >
                {/* Top bar: avatar + username + total stars */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.userAvatar}
                      alt={post.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0B3D26]"
                    />
                    <span className="font-semibold text-lg text-[#0B3D26]">
                      {post.userName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500 font-semibold text-lg select-none">
                    <FaStar />
                    <span>{totalStars}</span>
                  </div>
                </div>

                {/* Post content */}
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">
                  {post.textContent}
                </p>

                {/* Image if any */}
                {post.imageContent && (
                  <img
                    src={post.imageContent}
                    alt="Post visual content"
                    className="rounded-xl max-h-96 w-full md:max-w-96 object-cover"
                  />
                )}

                {/* Footer with time and user rating */}
                <footer className="mt-4 flex justify-between items-center text-gray-500 text-sm">
                  <time>
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </time>
                  <span>
                    Your rating: <strong>{userRating?.stars || 0} ⭐</strong>
                  </span>
                </footer>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Explore;
