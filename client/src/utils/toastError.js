import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const toastError = (error) => {
    const errorMsg =
    error?.response?.data?.message || 
    error?.message || 
    "An unexpected error occurred";

    toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", 
        style: { background: "#ef4444", color: "#fff" },
        transition: Bounce,
    });

};

export default toastError;