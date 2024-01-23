import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDetectNamespaces } from './hooks/useDetectNamespaces';

export const NamespacesGuardWrapper: React.FC = ({ children }) => {
  const [key, setKey] = React.useState<string>(uuidv4());
  useDetectNamespaces(setKey);

  return <React.Fragment key={key}>{children}</React.Fragment>;
};
