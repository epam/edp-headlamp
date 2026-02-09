import React from 'react';

export interface NamespaceControlProps {
  namespaces?: string[];
  setNamespaces?: React.Dispatch<React.SetStateAction<string[]>>;
}
