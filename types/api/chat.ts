export interface ChatWithKimiRequest {
  title: string;
  group_id: string;
  text: string;
  role: string;
  prompt: string;
  model: string;
}

export interface ChatWithKimiResponse {}

export interface ChatHistory {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface HistoryData {
  items: ChatHistory[];
}

export interface ChatMsg {
  id: string;
  title: string;
  group_id: string;
  content: string;
  model: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface MsgData {
  items: ChatMsg[];
}
