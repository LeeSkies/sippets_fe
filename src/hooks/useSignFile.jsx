import axios from "axios"
import instance from "../services/axios";

export const useSignFile = async (fd) => {
    try {
        const { data } = await instance.get('/protected/sippet/sign', { withCredentials: true })
        const { timestamp, signature, api_key } = data
        fd.append("api_key", api_key);
        fd.append("timestamp", timestamp);
        fd.append("signature", signature);
        const queryObj = { timestamp, signature, api_key }
        const queryString = Object.keys(queryObj).map(key => `${key}=${queryObj[key]}`).join('&')
        const url = "https://api.cloudinary.com/v1_1/" +  data.cloud_name + '/image/upload/?' + queryString;
        const { data:image } = await axios.post(url, fd, )
        // console.log(image);
        return image
    } catch (error) {
        console.log(error);
    }
}