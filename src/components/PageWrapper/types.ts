import { ContainerTypeMap } from '@mui/material/Container/Container';
import React from 'react';

export interface Breadcrumb {
  label: string | React.ReactElement;
  url?: {
    pathname: string;
    params?: { [key: string]: string };
  };
}

export interface PageWrapperProps {
  breadcrumbs?: Breadcrumb[];
  headerSlot?: React.ReactElement | undefined;
  breadcrumbsExtraContent?: React.ReactElement;
  containerMaxWidth?: ContainerTypeMap['props']['maxWidth'];
}
