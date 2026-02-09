import React from 'react';
import { ChatEntity } from '../../types';

export interface MessageProps {
  entityRole: ChatEntity;
  createdAt: string;
  content: React.ReactNode | string;
}
