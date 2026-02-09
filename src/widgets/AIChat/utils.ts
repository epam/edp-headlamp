import { CHAT_ENTITY, GPT_4 } from './constants';
import {
  ConversationItem,
  ConversationPayload,
  HistoryPayloadItem,
  HistoryStateItem,
  ResponseThought,
} from './types';

interface FetcherOptions extends RequestInit {
  url: string;
}

export const createFetcher = (options: FetcherOptions) => {
  return async (body?: any) => {
    return fetch(options.url, {
      ...options,
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
      .then((response) => {
        // Check if response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON from the response
        return response.json();
      })
      .catch((error) => {
        // Handle network errors or exceptions thrown during fetch
        // console.error('Fetch error:', error);
        throw error; // Rethrow so consumers can further handle the error
      });
  };
};

export const createChunkStreamFetcher = (options: FetcherOptions) => {
  return async (body?: any) => {
    return fetch(options.url, {
      ...options,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  };
};

export const processChatHistory = (history: HistoryStateItem[]): HistoryPayloadItem[] => {
  return history.reduce<HistoryPayloadItem[]>((acc, cur) => {
    acc.push({
      createdAt: cur.createdAt,
      role: CHAT_ENTITY.USER,
      message: cur.request.message,
    });
    acc.push({
      createdAt: cur.createdAt,
      role: CHAT_ENTITY.ASSISTANT,
      message: cur.response?.message || '',
    });

    return acc;
  }, []);
};

export const createConversationPayload = (
  conversationItem: ConversationItem,
  message: string
): ConversationPayload => {
  const basePayload: ConversationPayload = {
    conversationId: conversationItem.conversationId,
    text: message,
    file: conversationItem.file,
    prompt: conversationItem.prompt,
    history: processChatHistory(conversationItem.conversationHistory),
    llmModel: conversationItem.llmModel,
    stream: conversationItem.stream,
    _debug: conversationItem._debug,
    topK: conversationItem.topK,
  };

  if (conversationItem.codeMode) {
    basePayload.code_fields = {
      appName: basePayload.code_fields?.appName,
      repoName: basePayload.code_fields?.repoName,
      indexType: basePayload.code_fields?.indexType,
    };
  }

  return basePayload;
};

export const createStateConversation = ({
  conversationId,
  assistant,
  history = [],
}: {
  conversationId: string;
  assistant: any;
  history: HistoryStateItem[];
}): ConversationItem => {
  const newConversationState: ConversationItem = {
    conversationId: conversationId,
    assistantID: assistant.id,
    assistantName: assistant.name,
    assistantContext: assistant.context,
    prompt: assistant.system_prompt,
    llmModel: assistant.llm_model_type || GPT_4,
    assistantMode: true,
    file: null,
    conversationHistory: history,
    stream: true,
    _debug: true,
    topK: 10,
  };

  if (assistant.code_fields) {
    (newConversationState.appName = assistant.code_fields.appName),
      (newConversationState.repoName = assistant.code_fields.repoName);
    newConversationState.indexType = assistant.code_fields.indexType;

    newConversationState.codeMode = true;
    newConversationState.kbMode = false;
  } else if (assistant.knowledge_base) {
    newConversationState.codeMode = false;
    newConversationState.kbMode = true;
    newConversationState.kbName = assistant.knowledge_base;
    newConversationState.kbType = 'Assistant KB';
  } else {
    newConversationState.codeMode = false;
    newConversationState.kbMode = false;
  }

  return newConversationState;
};

export const copyToClipboard = (message: string) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        // toaster.info('Message copied to clipboard')
      })
      .catch(() => {
        // toaster.error('Could not copy text', err)
      });
  }
};

export const handleThought = (thought: ResponseThought, conversation: ConversationItem) => {
  const historyLength = conversation.conversationHistory.length;
  const lastHistoryItem = conversation.conversationHistory[historyLength - 1];

  const alreadyExistingStateThought = (lastHistoryItem.response?.thoughts || []).find(
    (t) => t.id_ === thought.id_
  );

  if (alreadyExistingStateThought) {
    if (thought.author_type)
      alreadyExistingStateThought.message += `**Tool:** ${thought.author_type} \n`;
    if (thought.message) alreadyExistingStateThought.message += `${thought.message}`;
  } else {
    lastHistoryItem.response!.thoughts!.push(thought);
  }
};
