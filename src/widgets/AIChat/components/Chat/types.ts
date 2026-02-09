import { CodemieSecretData, ConversationItem } from '../../types';

export interface ChatProps {
  codemieSecretData: CodemieSecretData;
  conversation: ConversationItem | null;
  updateConversation: (conversation: ConversationItem) => void;
  requestError: Error;
}
