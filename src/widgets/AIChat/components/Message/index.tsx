import { Stack, Typography } from '@mui/material';
import React from 'react';
import { CHAT_ENTITY } from '../../constants';
import { StyledMessage, StyledMessageWrapper } from './styles';
import { MessageProps } from './types';

export const Message = ({ entityRole, createdAt, content }: MessageProps) => {
  return (
    <StyledMessageWrapper entityRole={entityRole}>
      <StyledMessage entityRole={entityRole}>
        <Stack spacing={1}>
          <Typography variant="caption">
            {new Date(createdAt).toLocaleString('en-mini', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
            {' - '}
            <strong>{entityRole === CHAT_ENTITY.ASSISTANT ? 'AI Assistant' : 'You'}</strong>
          </Typography>
          <Stack spacing={1}>{content}</Stack>
        </Stack>
      </StyledMessage>
    </StyledMessageWrapper>
  );
};
