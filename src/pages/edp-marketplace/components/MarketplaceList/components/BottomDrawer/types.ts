import React from 'react';
import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';

export interface BottomDrawerProps {
  activeTemplate: EDPTemplateKubeObjectInterface;
  drawerOpen: boolean;
  toggleDrawer: (event: React.SyntheticEvent<{}, Event>, open: boolean) => void;
}
