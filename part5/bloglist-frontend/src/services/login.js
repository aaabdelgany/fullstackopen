import axios from 'axios';
const baseURL = '/api/login/';

const login = async (creds) => {
    const res = await axios.post(baseURL, creds);
    return res.data;
}

export default {login};