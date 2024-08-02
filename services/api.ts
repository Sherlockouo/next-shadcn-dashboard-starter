import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8011';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to save tokens to local storage
const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

// Helper function to get tokens from local storage
const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/refresh`, {
            refresh_token: refreshToken
          });
          saveTokens(data.access_token, data.refresh_token);
          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.access_token}`;
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${data.access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          if (
            axios.isAxiosError(refreshError) &&
            refreshError.response &&
            refreshError.response.status === 401
          ) {
            alert('Session has expired. Please log in again.');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/signin'; // Redirect to login page
          } else {
            console.error('Refresh token request failed', refreshError);
          }
        }
      } else {
        alert('Session has expired. Please log in again.');
        window.location.href = '/signin'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default api;
