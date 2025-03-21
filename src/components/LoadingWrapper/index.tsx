import React from 'react';
import { LoadingIndicator } from '../LoadingIndicator';

export const LoadingWrapper: React.FC<{ isLoading: boolean; size?: number }> = ({
  children,
  isLoading,
  size = 40,
}) => {
  return isLoading ? <LoadingIndicator size={size} /> : <>{children}</>;
};
