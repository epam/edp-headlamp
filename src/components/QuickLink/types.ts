import { ButtonProps } from '@mui/material';
import { QuickLinkKubeObjectInterface } from '../../k8s/groups/EDP/QuickLink/types';

export interface QuickLinkExternalLinkProps {
  icon: string;
  externalLink: string;
  name?: {
    label?: string;
    value?: string;
  };
  enabledText?: string;
  configurationLink?: {
    routeName?: string;
    routeParams?: {
      [key: string]: string;
    };
  };
  QuickLinkComponent?: QuickLinkKubeObjectInterface;
  isTextButton?: boolean;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}
