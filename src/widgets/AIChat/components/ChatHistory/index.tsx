import { Icon } from '@iconify/react';
import { Button, ButtonGroup, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { LOCAL_STORAGE_SERVICE } from '../../../../services/local-storage';
import { LS_KEY_CHATS } from '../..';
import { ChatHistoryProps } from './types';

export const ChatHistory = ({
  setConversations,
  conversations,
  activeConversation,
  setActiveConversation,
  createNewConversation,
}: ChatHistoryProps) => {
  const handleDeleteConversation = React.useCallback(
    (conversationId: string) => {
      setConversations((prev) => {
        const newConversations = { ...prev };
        delete newConversations[conversationId];

        LOCAL_STORAGE_SERVICE.setItem(LS_KEY_CHATS, newConversations);
        return newConversations;
      });
    },
    [setConversations]
  );

  return (
    <Stack height="100%">
      <ButtonGroup
        orientation="vertical"
        variant="text"
        color="inherit"
        sx={{ overflowY: 'auto', pr: (t) => t.typography.pxToRem(10) }}
      >
        <Button
          startIcon={<Icon icon={ICONS.PLUS} width={15} height={15} color="inherit" />}
          onClick={createNewConversation}
        >
          New chat
        </Button>
        {conversations.length
          ? conversations.map((el) => {
              const isActive =
                activeConversation && activeConversation.conversationId === el.conversationId;

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
                    backgroundColor: (t) => (isActive ? t.palette.action.hover : 'inherit'),
                    '&:hover': {
                      '& .hidden-button': {
                        pointerEvents: 'auto',
                        visibility: 'visible',
                      },
                    },
                  }}
                  startIcon={<Icon icon="ph:open-ai-logo-light" />}
                  onClick={() => setActiveConversation(el)}
                >
                  <Stack flexGrow={1}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                      alignItems="center"
                    >
                      <Typography variant="caption">
                        {messageDate.toLocaleString('en-mini', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </Typography>
                      <IconButton
                        onClick={() => handleDeleteConversation(el.conversationId)}
                        className="hidden-button"
                        sx={{ pointerEvents: 'none', visibility: 'hidden' }}
                      >
                        <Icon icon={ICONS.BUCKET} color="inherit" width={15} height={15} />
                      </IconButton>
                    </Stack>
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
  );
};
