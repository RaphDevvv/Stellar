import summaryApi from "../common/summaryapi"
import Axios from "./axios"

const fetchUser = async()=>{
    try {
        const res = await Axios({
            ...summaryApi.get_user
        })
        return res?.data?.details
    } catch (error) {
        console.log(error)
    }
}

export default fetchUser