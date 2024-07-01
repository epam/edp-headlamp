import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  ButtonGroup,
  Fab,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../k8s/Secret';
import { INTEGRATION_SECRET_NAMES } from '../../k8s/Secret/constants';
import { LOCAL_STORAGE_SERVICE } from '../../services/local-storage';
import { safeDecode } from '../../utils/decodeEncode';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { Chat } from './components/Chat';
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
  const [requestError, setRequestError] = React.useState<Error | null>(null);

  const [conversations, setConversations] = React.useState<ConversationState>(loadConversations);
  const [showList, setShowList] = React.useState<boolean>(false);
  const toggleShowList = () => setShowList((prev) => !prev);
  const conversationsArray = Object.values(conversations).sort((a, b) =>
    a.conversationHistory?.[0]?.createdAt < b.conversationHistory?.[0]?.createdAt ? 1 : -1
  );
  const [activeConversation, setActiveConversation] = React.useState<ConversationItem>();

  const getAssistantFetcher = createFetcher({
    url: `${codemieSecretData?.apiUrl}/${routeAssistantById(codemieSecretData?.assistantId)}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(codemieSecretData?.token),
    },
  });

  useQuery({
    queryKey: ['assistant', 'assistantID'],
    queryFn: () => getAssistantFetcher(),
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
    onError: (error: Error) => setRequestError(error),
  });

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
              onClick={toggleShowList}
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
          {showList && (
            <Box
              sx={{
                width: (t) => t.typography.pxToRem(300),
                py: (t) => t.typography.pxToRem(16),
                flexShrink: 0,
                borderRight: (t) => `1px solid ${t.palette.action.disabled}`,
              }}
            >
              <Stack height="100%">
                <ButtonGroup
                  orientation="vertical"
                  aria-label="Vertical button group"
                  variant="text"
                  color="inherit"
                  sx={{ overflowY: 'auto', pr: (t) => t.typography.pxToRem(10) }}
                >
                  {conversationsArray.length
                    ? conversationsArray.map((el) => {
                        const isActive = activeConversation.conversationId === el.conversationId;

                        const firstMessage = el.conversationHistory?.[0];
                        const messageDate = firstMessage?.createdAt
                          ? new Date(firstMessage?.createdAt)
                          : new Date();
                        const label = firstMessage?.request.message
                          ? firstMessage?.request.message.slice(0, 90)
                          : 'New conversation';

                        return (
                          <Button
                            key={el.conversationId}
                            color="inherit"
                            sx={{
                              justifyContent: 'flex-start',
                              textAlign: 'left',
                              textTransform: 'none',
                              backgroundColor: (t) =>
                                isActive ? t.palette.action.hover : 'inherit',
                            }}
                            startIcon={<Icon icon="ph:open-ai-logo-light" />}
                            onClick={() => setActiveConversation(el)}
                          >
                            <Stack>
                              <Typography variant="caption">
                                {messageDate.toLocaleString('en-mini', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: 'numeric',
                                })}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {label}
                              </Typography>
                            </Stack>
                          </Button>
                        );
                      })
                    : null}
                </ButtonGroup>
              </Stack>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
            <Chat
              conversation={activeConversation}
              updateConversation={updateConversation}
              codemieSecretData={codemieSecretData}
              requestError={requestError}
            />
          </Box>
        </StyledChatBody>
      </Popover>
    </>
  );
};

export const AiChatWrapper = () => {
  const [codemieSecret] = SecretKubeObject.useGet(
    INTEGRATION_SECRET_NAMES.CODEMIE,
    getDefaultNamespace()
  );

  const codemieSecretData = React.useMemo(() => {
    if (codemieSecret === null) {
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
