import React from 'react';

export interface NoDataWidgetWrapperProps {
  hasData: boolean;
  isLoading: boolean;
  text?: string | React.ReactElement;
}
