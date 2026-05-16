import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  
  login: async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { user, accessToken } = response.data;
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', accessToken);
      
      set({ user, token: accessToken });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  },
  
  register: async (dto) => {
    try {
      const response = await axios.post('/api/auth/register', dto);
      const { user, accessToken } = response.data;
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', accessToken);
      
      set({ user, token: accessToken });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));

export default useAuthStore;
