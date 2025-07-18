import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importação do CSS necessária para os toasts

const toastSuccess = (msg) => {
    toast.success(msg, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", 
        style: { background: "#16a34a", color: "#fff" }, 
        transition: Bounce,
    });
};

export default toastSuccess;
