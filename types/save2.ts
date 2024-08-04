export interface Save2NotionRequest {
  content: string;
  parse_url: boolean;
  tags: string[];
  save2_platform: string;
  source_platform: string;
}

export interface Save2NotionResponse {
  id: string;
  result: string;
  url: string;
}
