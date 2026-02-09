import React from 'react';
import { DataContext } from './context';

export const useDataContext = () => React.useContext(DataContext);
