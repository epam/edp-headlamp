import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'quick-links',
  label: 'Links',
  description: 'Configure links for quick access to required tools.',
  docLink: EDP_USER_GUIDE.OVERVIEW.url,
  routePath: '/configuration/quicklinks',
};

export const permissionChecks = {
  QUICK_LINK: 'quickLink',
} as const;
