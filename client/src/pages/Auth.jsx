import React, { useEffect, useState } from 'react';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryapi';
import fetchUser from '../utils/fetchUser';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import toastError from '../utils/toastError';
import logo from '../assets/logo.png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await Axios({
          ...summaryApi.login,
          data: {
            name: form.name,
            email: form.email,
            password: form.password
          }
        });

        if (res.data.success) {
          setForm({ name: "", email: "", password: "" });
          const uDetails = await fetchUser();
          dispatch(setUserDetails(uDetails));
          navigate("/");
        }
      } else {
        const res = await Axios({
          ...summaryApi.register,
          data: {
            name: form.name,
            email: form.email,
            password: form.password
          }
        });

        if (res.data.success) {
          setForm({ name: "", email: "", password: "" });
          const uDetails = await fetchUser();
          dispatch(setUserDetails(uDetails));
          navigate("/");
        }
      }
    } catch (error) {
      toastError(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-green-100">
      {/* Left Side Banner */}
      <div className="hidden md:flex w-1/2 bg-[#0B3D26] items-center justify-center p-10 text-white">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Stellar.</h1>
          <p className="text-lg">
            {isLogin
              ? 'Log in to connect with your community.'
              : 'Join Stellar and shine with your ideas.'}
          </p>
        </div>
      </div>

      {/* Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-2xl">
          <h2 className="text-3xl font-bold text-center text-[#0B3D26] mb-6">
            {isLogin ? 'Sign-in' : 'Register'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0B3D26]"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0B3D26]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0B3D26]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0B3D26]"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg bg-[#0B3D26] text-white font-semibold transition-all duration-300 cursor-pointer hover:bg-[#08311F] ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#0B3D26] font-semibold hover:underline cursor-pointer"
            >
              {isLogin ? 'Register' : 'Sign-in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
