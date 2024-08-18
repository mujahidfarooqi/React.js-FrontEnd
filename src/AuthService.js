// AuthService.js
import axios from 'axios';

class AuthService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static async login(email, password) {
    try {
      const response = await axios.post('http://localhost:15713/api/login', { email, password });
      const { token } = response.data;
      this.setToken(token);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Login failed:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.message);
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
      }
      throw error;
    }
  }

  static async getAuthorizedRequestConfig() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  static async makeAuthorizedRequest(method, url, data) {
    const config = await this.getAuthorizedRequestConfig();
    return axios({ method, url, data, ...config });
  }
}

export default AuthService;
