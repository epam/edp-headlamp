import React from 'react';
import { ResourceActionListContext } from './context';
import { ResourceActionListContextProviderValue } from './types';

export const useResourceActionListContext = <DataType>() =>
  React.useContext<ResourceActionListContextProviderValue<DataType>>(ResourceActionListContext);
