import axios from 'axios';

const API_URL = 'http://localhost:5003/api';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
