import { CodemieSecretData, ConversationItem } from '../../types';

export interface ChatProps {
  codemieSecretData: CodemieSecretData;
  conversation: ConversationItem;
  updateConversation: (conversation: ConversationItem) => void;
  requestError: Error;
}
