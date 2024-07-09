import axios from "axios";

export const postData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        throw new Error(error)
    }
};

