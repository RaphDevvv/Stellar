import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import uploadImage from '../utils/uploadImage';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import { setUserDetails, updateAvatar } from '../store/userSlice';
import toastError from '../utils/toastError';
import toastSuccess from '../utils/toastSuccess';

const Account = ({ close }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch()


    const handleChange = (e) => {
        setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };


    const handleImageChange = async (e) => {
    try {
      setLoading(true)
    
    const file = e.target.files[0];
      if (!file) return;

      const link = await uploadImage(file);
      const res = await Axios({
        ...summaryApi.upload_avatar,
        data: { imageLink: link }
      });

      if (res.data.success) {
        dispatch(updateAvatar(res.data.avatar));
      }
    } catch (error) {
      toastError(error)
    } finally {setLoading(false)}
  };

  const handleSubmit = async ()=>{
    try {
        const res = await Axios({
            ...summaryApi.edit_user,
            data: {
                name: form.name,
                email: form.email
            }
        })

        if (res.data.success) {
          toastSuccess(res.data.message)
        }
    } catch (error) {
        toastError(error)
    }
  }

  return (
    <section className="fixed inset-0 z-60 bg-neutral-800/70 p-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-[800px] relative">
        
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-[#0B3D26] mb-6 text-center">
          My Account
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className={`w-28 h-28 rounded-full overflow-hidden border-4 border-green-900 bg-[#0B3D26] shadow ${
    loading ? 'animate-pulse' : ''
  }`}>
      
              <img
                src={user.avatar}
                alt="Preview"
                className="w-full h-full object-cover"
              />
          </div>
          <label
            htmlFor="profileImage"
            className="mt-3 cursor-pointer text-sm text-[#0B3D26] font-medium underline hover:text-[#064d34]"
          >
            Change picture
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder={user.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 focus:outline-[#0B3D26]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder={user.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 focus:outline-[#0B3D26]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">New Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 focus:outline-[#0B3D26]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-right">
          <button
            onClick={()=>handleSubmit()}
            className="bg-[#0B3D26] text-white px-6 py-2 rounded-lg hover:bg-[#09492d] transition active:scale-95 cursor-pointer"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </section>
  );
};

export default Account;
