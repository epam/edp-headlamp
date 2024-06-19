import { Icon } from '@iconify/react';
import { Alert, Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import * as sanitizeHtml from 'sanitize-html';
import { v4 as uuidv4 } from 'uuid';
import { authHeaders, routeAssistantChatModel } from '../..';
import { CHAT_ENTITY } from '../../constants';
import { useStreaming } from '../../hooks/useStreaming';
import { StyledChatFooter, StyledLoadingDot, StyledMessageList } from '../../styles';
import { ConversationItem, ConversationPayload, ConversationResponseChunk } from '../../types';
import { createChunkStreamFetcher, createConversationPayload } from '../../utils';
import formatAiMessage from '../../utils/formatMessage';
import { Message } from '../Message';
import { ChatProps } from './types';

export const Chat = ({
  codemieSecretData,
  conversation,
  updateConversation,
  requestError,
}: ChatProps) => {
  const [_conversation, setConversation] = React.useState<ConversationItem>(conversation);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const assistantChatFetcher = createChunkStreamFetcher({
    url: `${codemieSecretData?.apiUrl}/${routeAssistantChatModel(codemieSecretData?.assistantId)}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(codemieSecretData?.token),
    },
  });

  const { mutate: sendMessage } = useStreaming<
    ConversationPayload,
    string,
    ConversationResponseChunk
  >({
    fetcher: assistantChatFetcher,
    onNewChunk: async (value, accumulator) => {
      const _accumulator = [...accumulator];

      if (value.last) {
        setConversation((prev) => {
          const updatedHistory = [...prev.conversationHistory];
          updatedHistory[updatedHistory.length - 1].response.message = value.generated;

          const newConversation = {
            ...prev,
            conversationHistory: updatedHistory,
          };

          updateConversation(newConversation);

          return newConversation;
        });
        return _accumulator;
      }

      const generatedText = value.generated_chunk;
      if (generatedText.trim() !== '') {
        _accumulator.push(generatedText);
      }

      let chatStream = _accumulator.join('');

      if ((chatStream.match(/```/g) || []).length % 2 === 1) {
        chatStream += '```'; // append a closing ```
      }

      const formattedChunks = await formatAiMessage(chatStream);

      setConversation((prev) => {
        const updatedHistory = [...prev.conversationHistory];

        updatedHistory[updatedHistory.length - 1].response.processedChunks = [...formattedChunks];
        return {
          ...prev,
          conversationHistory: updatedHistory,
        };
      });

      return _accumulator;
    },
    onStart: () => {},
    onFinish: (data) => {
      console.log('finish', data);
    },
    onError: (error) => console.log('error', error),
  });

  React.useEffect(() => {
    setConversation(conversation);
  }, [conversation]);

  const handleSendMessage = React.useCallback(
    (text: string) => {
      setConversation((prev) => {
        const newConversation = {
          ...prev,
          conversationHistory: [
            ...prev.conversationHistory,
            {
              id: uuidv4(),
              createdAt: new Date().toISOString(),
              request: { message: text },
              response: {
                message: undefined,
                processedChunks: [],
              },
            },
          ],
        };

        const newConversationPayload = createConversationPayload(prev, text);
        sendMessage(newConversationPayload);
        updateConversation(newConversation);

        return newConversation;
      });
    },
    [sendMessage, updateConversation]
  );

  const isEmpty =
    !_conversation?.conversationHistory || _conversation?.conversationHistory.length === 0;
  const theme = useTheme();

  return (
    <>
      <StyledMessageList>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {!isEmpty ? (
            <Stack spacing={2} width="100%">
              {_conversation.conversationHistory.map((chat) => {
                return (
                  <Stack spacing={2} alignItems="center" key={chat.id}>
                    <Message
                      entityRole={CHAT_ENTITY.USER}
                      createdAt={chat.createdAt}
                      content={chat.request.message}
                    />
                    <Message
                      entityRole={CHAT_ENTITY.ASSISTANT}
                      createdAt={chat.createdAt}
                      content={
                        chat.response.processedChunks.length === 0 ? (
                          <Stack direction="row" alignItems="center">
                            <StyledLoadingDot />
                            <StyledLoadingDot />
                            <StyledLoadingDot />
                          </Stack>
                        ) : (
                          chat.response.processedChunks.map((segment) => (
                            <React.Fragment key={segment.id}>
                              {segment.isCode ? (
                                <code
                                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(segment?.text) }}
                                />
                              ) : (
                                <span
                                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(segment?.text) }}
                                />
                              )}
                            </React.Fragment>
                          ))
                        )
                      }
                    />
                  </Stack>
                );
              })}
            </Stack>
          ) : !!requestError ? (
            <Alert severity="warning">
              <Typography>Oops, something went wrong!</Typography>
              <Typography>{requestError.message}</Typography>
            </Alert>
          ) : (
            <Stack spacing={2} width="100%" alignItems="center">
              <Icon
                icon="streamline:ai-science-spark"
                width={150}
                color={theme.palette.action.disabled}
                style={{ margin: '0 auto', alignSelf: 'center' }}
              />
              <Typography>Enter any question related to portal below</Typography>
            </Stack>
          )}
        </Box>
      </StyledMessageList>
      <StyledChatFooter>
        <Stack direction="row" spacing={1}>
          <TextField
            variant="outlined"
            type="text"
            defaultValue="" // changed from value to defaultValue
            fullWidth
            // remove the onChange handler
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (inputRef.current) {
                  handleSendMessage(inputRef.current.value);
                  inputRef.current.value = ''; // clear the input field
                }
                e.preventDefault();
              }
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            placeholder="Enter a message"
            inputRef={inputRef} // add inputRef prop to get input value
            InputProps={{
              endAdornment: (
                <Button
                  onClick={() => {
                    if (inputRef.current) {
                      handleSendMessage(inputRef.current.value);
                      inputRef.current.value = ''; // clear the input field
                    }
                  }}
                  disabled={!!requestError}
                >
                  <Icon icon="mdi:send" width={30} height={30} />
                </Button>
              ),
              disabled: !!requestError,
            }}
          />
        </Stack>
      </StyledChatFooter>
    </>
  );
};
