import { Icon } from '@iconify/react';
import { Box, Fab, IconButton, Popover, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../k8s/groups/default/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../k8s/groups/default/Secret/labels';
import { LOCAL_STORAGE_SERVICE } from '../../services/local-storage';
import { safeDecode } from '../../utils/decodeEncode';
import { Chat } from './components/Chat';
import { ChatHistory } from './components/ChatHistory';
import { StyledChatBody, StyledChatHeader } from './styles';
import { CodemieSecretData, ConversationItem, ConversationState } from './types';
import { createFetcher, createStateConversation } from './utils';

export const LS_KEY_CHATS = 'LS_KEY_CHATS';

export const routeAssistantById = (assistantID: string) => `v1/assistants/id/${assistantID}`;
export const routeAssistantChatModel = (assistantID: string) =>
  `v1/assistants/${assistantID}/model`;

export const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const loadConversations = () => {
  return LOCAL_STORAGE_SERVICE.getItem(LS_KEY_CHATS) || {};
};

export const AiChat = ({ codemieSecretData }: { codemieSecretData: CodemieSecretData }) => {
  const newConversationID = uuidv4();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [conversations, setConversations] = React.useState<ConversationState>(loadConversations);
  const conversationsArray = Object.values(conversations).sort((a, b) =>
    a.conversationHistory?.[0]?.createdAt < b.conversationHistory?.[0]?.createdAt ? 1 : -1
  );

  const [showHistory, setShowHistory] = React.useState<boolean>(false);
  const toggleShowHistory = () => setShowHistory((prev) => !prev);

  const [activeConversation, setActiveConversation] = React.useState<ConversationItem>(null);
  const assistantUrl = `${codemieSecretData?.apiUrl}/${routeAssistantById(
    codemieSecretData?.assistantId
  )}`;

  const getAssistantFetcher = createFetcher({
    url: assistantUrl,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(codemieSecretData?.token),
    },
  });

  const query = useQuery({
    queryKey: ['assistant', codemieSecretData?.assistantId],
    queryFn: () => getAssistantFetcher(),
    staleTime: 60000, // 1 minute
    cacheTime: 60000, // 1 minute
    retry: false,
    onSuccess: (data) => {
      const newConversation = createStateConversation({
        conversationId: newConversationID,
        assistant: data,
        history: [],
      });

      setConversations((prev) => ({
        ...prev,
        [newConversationID]: newConversation,
      }));
      setActiveConversation(newConversation);
    },
  });

  const { data: assistantData, error: requestError } = query;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const updateConversation = (conversation: ConversationItem) => {
    setConversations((prev) => {
      const newConversations = {
        ...prev,
        [conversation.conversationId]: conversation,
      };

      LOCAL_STORAGE_SERVICE.setItem(LS_KEY_CHATS, newConversations);

      return newConversations;
    });
  };

  const createNewConversation = () => {
    if (!assistantData) {
      return;
    }

    const newConversationID = uuidv4();

    const newConversation = createStateConversation({
      conversationId: newConversationID,
      assistant: assistantData,
      history: [],
    });

    setConversations((prev) => ({
      ...prev,
      [newConversationID]: newConversation,
    }));
    setActiveConversation(newConversation);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="AI Chat"
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: '50px', right: '50px' }}
      >
        <Icon icon={ICONS.CHAT} width={24} height={24} />
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              width: (t) => t.typography.pxToRem(1200),
              height: '70vh',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <StyledChatHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <IconButton
              onClick={toggleShowHistory}
              disabled={!conversationsArray.length || !!requestError}
            >
              <Icon icon={'mdi:history'} color={'#fff'} />
            </IconButton>
            <Typography>AI Assistant </Typography>
            <IconButton onClick={handleClose}>
              <Icon icon={ICONS.CROSS} color={'#fff'} />
            </IconButton>
          </Stack>
        </StyledChatHeader>
        <StyledChatBody direction="row" flexGrow={1} spacing={2} overflow="hidden">
          {showHistory && (
            <Box
              sx={{
                width: (t) => t.typography.pxToRem(300),
                py: (t) => t.typography.pxToRem(16),
                flexShrink: 0,
                borderRight: (t) => `1px solid ${t.palette.action.disabled}`,
              }}
            >
              <ChatHistory
                conversations={conversationsArray}
                activeConversation={activeConversation}
                setActiveConversation={setActiveConversation}
                setConversations={setConversations}
                createNewConversation={createNewConversation}
              />
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
            <Chat
              conversation={activeConversation}
              updateConversation={updateConversation}
              codemieSecretData={codemieSecretData}
              requestError={requestError as Error}
            />
          </Box>
        </StyledChatBody>
      </Popover>
    </>
  );
};

export const AiChatWrapper = () => {
  const [codemieSecrets] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=chat-assistant`,
  });
  const codemieSecret = codemieSecrets?.[0]?.jsonData;

  const codemieSecretData = React.useMemo(() => {
    if (!codemieSecret) {
      return null;
    }

    const dataCopy = { ...codemieSecret?.data };

    for (const key in dataCopy) {
      dataCopy[key] = safeDecode(dataCopy[key]);
    }

    return dataCopy;
  }, [codemieSecret]);

  return codemieSecretData && <AiChat codemieSecretData={codemieSecretData} />;
};
