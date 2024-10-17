import axios, {AxiosResponse} from 'axios';


const API_URL = 'https://gorest.co.in/public/v2/users';
const API_TOKEN = 'YOUR_API_TOKEN';

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

export interface User {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(API_URL, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get(`${API_URL}/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.put(`${API_URL}/${id}`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
