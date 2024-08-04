import api from '@/services/api';
import { Save2NotionRequest, Save2NotionResponse } from '@/types/save2';
import axios from 'axios';

export interface APIResponse {
  code: number;
  message: string;
  data: Save2NotionResponse;
}

export const save2notion = async (
  data: Save2NotionRequest
): Promise<APIResponse> => {
  try {
    const response = await api.post<APIResponse>('/save2/notion/', data);
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
