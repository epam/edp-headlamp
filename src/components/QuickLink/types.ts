import { QuickLinkKubeObjectInterface } from '../../k8s/QuickLink/types';

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
  variant?: 'icon' | 'text';
  size?: 'small' | 'medium' | 'large';
}
