import summaryApi from "../common/summaryapi";
import Axios from "./axios"

const uploadImage = async (image)=>{
    try {
        const formData = new FormData();
        formData.append('image', image);

        const res = await Axios({
            ...summaryApi.upload_image,
            data: formData
        })

        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export default uploadImage