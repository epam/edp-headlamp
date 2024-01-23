import React from 'react';
import { FilterState } from '../../../../types';

export interface SearchControlProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}
