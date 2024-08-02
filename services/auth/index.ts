import api from '@/services/api';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface Data {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface APIResponse {
  code: number;
  message: string;
  data: Data;
}

export const loginWithProvider = async (
  provider: string,
  code: string
): Promise<APIResponse> => {
  try {
    const response = await api.get<APIResponse>(
      `/oauth/${provider}?code=${code}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to authenticate'
      );
    } else {
      throw new Error('Failed to authenticate');
    }
  }
};
