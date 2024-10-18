import axios from 'axios';


const API_URL = 'https://gorest.co.in/public/v2/users';
const API_TOKEN = 'c6797e8b1984d7bc826c98691db8a35d367f80c5b81be6b68a01e9e90ee69684';

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
    // AxiosResponse import causes error for some reason so I use any
    const response: any = await axios.get(API_URL, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response: any = await axios.get(`${API_URL}/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const response: any = await axios.put(`${API_URL}/${id}`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
