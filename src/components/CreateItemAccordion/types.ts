import React from 'react';

export interface CreateItemAccordionProps {
  title: string | React.ReactElement;
  isExpanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  disabled?: boolean;
}
