import api from '@/services/api';
import {
  ChatWithKimiRequest,
  ChatWithKimiResponse,
  MsgData
} from '@/types/api/chat';
import axios from 'axios';

export interface APIResponse {
  code: number;
  message: string;
  data: ChatWithKimiResponse;
}

export const chatWithKimi = async (
  data: ChatWithKimiRequest
): Promise<APIResponse> => {
  try {
    const response = await api.post<APIResponse>('/chat/kimi/', data);
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

interface HistoryResponse {
  code: number;
  message: string;
  data: MsgData;
}
export const kimiChatDetail = async (
  chatId: string,
  size: number,
  offset: number
): Promise<HistoryResponse> => {
  try {
    const response = await api.get<HistoryResponse>(
      `/chat/kimi/${chatId}?size=${size}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to get chat detail'
      );
    } else {
      throw new Error('Failed to get chat detail');
    }
  }
};

interface DetailResponse {
  code: number;
  message: string;
  data: MsgData;
}

export const kimiChatHistory = async (
  size: number,
  offset: number
): Promise<DetailResponse> => {
  try {
    const response = await api.get<DetailResponse>(
      `/chat/kimi/history?size=${size}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to get history');
    } else {
      throw new Error('Failed to get history');
    }
  }
};
