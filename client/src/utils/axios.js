import axios from 'axios'
import { baseUrl } from '../common/summaryapi'

const Axios = axios.create({
    baseURL: baseUrl,
    withCredentials: true, 
  });
  
  
  export default Axios;
  