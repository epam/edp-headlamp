import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';

export interface ConfigurationItem {
  title: string | React.ReactElement;
  component: React.ReactElement;
  id?: string;
  ownerReference?: string;
  disabled?: boolean;
}

export interface ConfigurationBodyProps {
  pageData?: {
    label?: string;
    description?: string;
    docUrl?: string;
  };
  renderPlaceHolderData?: ({
    handleClosePlaceholder,
  }: {
    handleClosePlaceholder: () => void;
  }) => ConfigurationItem;
  items?: ConfigurationItem[];
  emptyMessage?: string;
  blocker?: React.ReactElement;
  bodyOnly?: boolean;
  onlyOneItem?: boolean;
  error?: ApiError;
}
