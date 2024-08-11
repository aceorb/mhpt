import axios from "axios";
const apiUrl = 'http://localhost:9000/api';

const headers: any = {
  'Content-Type': 'application/json',
};

const submitDailyLog = async (data: any) => {
  try {
    const token = localStorage.getItem('authToken');
    if(token)
      headers['Authorization'] = `Bearer ${token}`;
    const response =  await axios.post(`${apiUrl}/log`, data, { headers })
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
};

const getLogs = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if(token)
      headers['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${apiUrl}/logs`, { headers })
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
};

const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if(token)
      headers['Authorization'] = `Bearer ${token}`;
    const response =  await axios.get(`${apiUrl}/auth/info`, { headers })
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
};

const api = {
  submitDailyLog,
  getLogs,
  getUserInfo
};

export default api;