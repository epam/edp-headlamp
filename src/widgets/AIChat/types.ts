import { ValueOf } from '../../types/global';
import { CHAT_ENTITY } from './constants';

export type ChatEntity = ValueOf<typeof CHAT_ENTITY>;

export interface ChatItemRequest {
  message: string;
}

export interface ProcessedChunk {
  id: string;
  text: string;
  isCode: boolean;
}

export interface ChatItemResponse {
  message: string | undefined; // is available on streaming finish
  processedChunks: ProcessedChunk[];
}

export interface HistoryStateItem {
  id: string;
  createdAt: string;
  request: ChatItemRequest;
  response?: ChatItemResponse;
}

export interface HistoryPayloadItem {
  createdAt: string;
  message: string;
  role: ChatEntity;
}

export interface ConversationItem {
  conversationId: string;
  conversationHistory: HistoryStateItem[];
  assistantID: string;
  assistantName: string;
  assistantContext: string;
  prompt: string;
  llmModel: string;
  assistantMode: boolean;
  file: File | null;
  stream: boolean;
  _debug: boolean;
  topK: number;
  codeMode?: boolean;
  kbMode?: boolean;
  kbType?: string;
  kbName?: string;
  appName?: string;
  repoName?: string;
  indexType?: string;
}

export interface ConversationPayload {
  conversationId: string;
  text: string;
  file: File | null;
  prompt: string;
  history: HistoryPayloadItem[];
  llmModel: string;
  stream: boolean;
  _debug: boolean;
  topK: number;
  code_fields?: {
    appName: string;
    repoName: string;
    indexType: string;
  };
}

export interface ConversationResponseChunk {
  time_elapsed: number;
  input_tokens_used: number;
  tokens_used: number;
  generated_chunk: string;
  generated: string;
  thought: string;
  last: boolean;
  debug: null;
}

export interface ConversationState {
  [key: string]: ConversationItem;
}

export interface CodemieSecretData {
  apiUrl: string;
  assistantId: string;
  token: string;
}
