import { ConversationItem, ConversationState } from '../../types';

export interface ChatHistoryProps {
  conversations: ConversationItem[];
  activeConversation: ConversationItem | null;
  setActiveConversation: React.Dispatch<React.SetStateAction<ConversationItem | null>>;
  setConversations: React.Dispatch<React.SetStateAction<ConversationState>>;
  createNewConversation: () => void;
}
