import { ConversationItem, ConversationState } from '../../types';

export interface ChatHistoryProps {
  conversations: ConversationItem[];
  activeConversation: ConversationItem;
  setActiveConversation: React.Dispatch<React.SetStateAction<ConversationItem>>;
  setConversations: React.Dispatch<React.SetStateAction<ConversationState>>;
  createNewConversation: () => void;
}
