import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { authHeaders, routeAssistantChatModel } from '../..';
import { CHAT_ENTITY } from '../../constants';
import { useStreaming } from '../../hooks/useStreaming';
import { StyledChatFooter, StyledLoadingDot, StyledMessageList } from '../../styles';
import {
  ChatItemResponse,
  ConversationItem,
  ConversationPayload,
  ConversationResponseChunk,
  ResponseThought,
} from '../../types';
import { createChunkStreamFetcher, createConversationPayload } from '../../utils';
import formatAiMessage from '../../utils/formatMessage';
import { sanitizeMessage } from '../../utils/sanitizeMessage';
import { Message } from '../Message';
import { ChatProps } from './types';

const ChatThoughts = ({ thoughts }: { thoughts: ResponseThought[] }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {thoughts?.map((thought, idx) => {
        const isLast = idx === thoughts.length - 1;
        const isLoading = thought.in_progress;

        return (
          <Accordion
            expanded={isLoading || isLast || expanded === thought.id_}
            onChange={handleChange(thought.id_)}
            sx={{ backgroundColor: 'transparent' }}
          >
            <AccordionSummary
              id={thought.id_}
              expandIcon={<Icon icon={ICONS.ARROW_DOWN} width={20} height={20} />}
            >
              <Typography fontWeight={600} fontSize={14}>
                Tool: {thought.tool_name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                <div>
                  {thought?.processedChunks &&
                    thought?.processedChunks.map((segment) => {
                      return (
                        <React.Fragment key={segment.id}>
                          {segment.isCode ? (
                            <code
                              dangerouslySetInnerHTML={{ __html: sanitizeMessage(segment?.text) }}
                            />
                          ) : (
                            <span
                              dangerouslySetInnerHTML={{ __html: sanitizeMessage(segment?.text) }}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>
                {isLoading && (
                  <Stack direction="row" alignItems="center">
                    <StyledLoadingDot />
                    <StyledLoadingDot />
                    <StyledLoadingDot />
                  </Stack>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export const Chat = ({
  codemieSecretData,
  conversation,
  updateConversation,
  requestError,
}: ChatProps) => {
  const [_conversation, setConversation] = React.useState<ConversationItem>(conversation);
  const [isRequestLoading, setIsRequestLoading] = React.useState(false);

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
      setIsRequestLoading(false);

      const _accumulator = [...accumulator];

      if (value.last) {
        setConversation((prev) => {
          const updatedHistory = [...prev.conversationHistory];
          const historyLength = updatedHistory.length;
          const lastHistoryItem = updatedHistory[historyLength - 1];
          lastHistoryItem.response.message = value.generated;
          lastHistoryItem.response.inProgress = false;

          const newConversation = {
            ...prev,
            conversationHistory: updatedHistory,
          };

          updateConversation(newConversation);

          return newConversation;
        });
        return _accumulator;
      }

      let chatStream = _accumulator.join('');
      let generatedText = '';

      if (value.thought) {
        const thought = value.thought;

        setConversation((prev) => {
          const historyLength = prev.conversationHistory.length;
          const lastHistoryItem = prev.conversationHistory[historyLength - 1];
          if (!lastHistoryItem.response.thoughts) lastHistoryItem.response.thoughts = [];

          const alreadyExistingStateThought = lastHistoryItem.response.thoughts.find(
            (t) => t.id_ === thought.id_
          );

          if (alreadyExistingStateThought) {
            alreadyExistingStateThought.in_progress = thought.in_progress;
            alreadyExistingStateThought.message += thought.message;

            formatAiMessage(alreadyExistingStateThought.message).then(
              (res) => (alreadyExistingStateThought.processedChunks = res)
            );

            if (thought.in_progress === false) {
              alreadyExistingStateThought.in_progress = false;
            }
          } else {
            if (thought.message.trim() !== '') {
              lastHistoryItem.response.thoughts = [...lastHistoryItem.response.thoughts, thought];
            }
          }

          return {
            ...prev,
            conversationHistory: [...prev.conversationHistory],
          };
        });
      } else {
        generatedText = value.generated_chunk;

        if (generatedText.trim() !== '') {
          _accumulator.push(generatedText);
        }

        if ((chatStream.match(/```/g) || []).length % 2 === 1) {
          chatStream += '```'; // append a closing ```
        }

        const formattedChunks = await formatAiMessage(chatStream);

        setConversation((prev) => {
          const updatedHistory = [...prev.conversationHistory];
          const historyLength = updatedHistory.length;
          const lastHistoryItem = updatedHistory[historyLength - 1];

          if (!lastHistoryItem.response.inProgress) {
            lastHistoryItem.response.inProgress = true;
          }

          lastHistoryItem.response.processedChunks = [...formattedChunks];

          return {
            ...prev,
            conversationHistory: updatedHistory,
          };
        });
      }

      return _accumulator;
    },
    onStart: () => {
      setIsRequestLoading(true);
    },
    onFinish: () => {
      // console.log('finish', data);
    },
    onError: (error) => console.log('error', error),
  });

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

  React.useEffect(() => {
    setConversation(conversation);
  }, [conversation]);

  const renderChatResponse = React.useCallback(
    (chatResponse: ChatItemResponse, isLast: boolean) => {
      const responseType = chatResponse.thoughts ? 'multiple' : 'single';

      if (isRequestLoading && isLast) {
        return (
          <Stack direction="row" alignItems="center">
            <StyledLoadingDot />
            <StyledLoadingDot />
            <StyledLoadingDot />
          </Stack>
        );
      }

      switch (responseType) {
        case 'single':
          return chatResponse.inProgress ? (
            <Stack direction="row" alignItems="center">
              <StyledLoadingDot />
              <StyledLoadingDot />
              <StyledLoadingDot />
            </Stack>
          ) : (
            chatResponse.processedChunks.map((segment) => (
              <React.Fragment key={segment.id}>
                {segment.isCode ? (
                  <code dangerouslySetInnerHTML={{ __html: sanitizeMessage(segment?.text) }} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: sanitizeMessage(segment?.text) }} />
                )}
              </React.Fragment>
            ))
          );
        case 'multiple':
          return <ChatThoughts thoughts={chatResponse.thoughts} />;
        default:
          return null;
      }
    },
    [isRequestLoading]
  );

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
              {_conversation.conversationHistory.map((chat, idx) => {
                const isLast = idx === _conversation.conversationHistory.length - 1;
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
                      content={renderChatResponse(chat.response, isLast)}
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
