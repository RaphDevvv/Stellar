import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from './common/summaryapi';
import Axios from './utils/axios';
import { useEffect, useState } from 'react';
import { setUserDetails } from './store/userSlice';
import { ToastContainer } from 'react-toastify';
import toastError from './utils/toastError';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await Axios({ ...summaryApi.get_user });
      if (res?.data?.success) {
        dispatch(setUserDetails(res?.data?.details));
      }
    } catch (error) {
      toastError(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoading && !user?._id) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <main>
      <Header />
      <Outlet />
      <ToastContainer/>
    </main>
  );
}

export default App;