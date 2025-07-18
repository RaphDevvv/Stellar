import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import { useSelector } from 'react-redux';
import uploadImage from '../utils/uploadImage';

const SubmitPost = ({ close, refresh }) => {
  const user = useSelector((state) => state.user);

  const [postInfo, setPostInfo] = useState({
    textContent: ""
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Novo estado de loading

  const handleTextChange = (e) => {
    setPostInfo((prev) => ({
      ...prev,
      textContent: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    try {
      setLoading(true); // Ativa o loading
      let imgUrl = null;
      if (selectedFile) {
        imgUrl = await uploadImage(selectedFile);
      }

      const res = await Axios({
        ...summaryApi.upload_posts,
        data: {
          userName: user.name,
          textContent: postInfo.textContent,
          imageContent: imgUrl
        }
      });

      if (res.data.success) {
        close();
        refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <section className="fixed inset-0 z-60 bg-neutral-800/70 p-4 flex items-center justify-center">
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-[800px] ${loading ? 'animate-pulse' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#0B3D26]">Create Post</h2>
          <div
            onClick={close}
            className="p-2 hover:bg-gray-300 rounded-full cursor-pointer transition"
          >
            <IoClose size={26} />
          </div>
        </div>

        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B3D26] transition"
          rows="3"
          placeholder="What's on your mind?"
          value={postInfo.textContent}
          onChange={handleTextChange}
        />

        <div className="mt-4">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="inline-block cursor-pointer bg-[#0B3D26] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#094027] transition"
          >
            Add image
          </label>
        </div>

        {previewImage && (
          <div className="mt-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg border"
            />
          </div>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={handlePost}
            className="bg-[#0B3D26] text-white px-6 py-2 rounded-lg hover:bg-[#09492d] transition active:scale-95 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubmitPost;
