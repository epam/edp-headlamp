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
  variant?: 'icon' | 'text';
}
