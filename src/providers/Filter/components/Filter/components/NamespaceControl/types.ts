import React from 'react';
import { FilterState } from '../../../../types';

export interface NamespaceControlProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  namespaces?: string[];
  setNamespaces?: React.Dispatch<React.SetStateAction<string[]>>;
}
