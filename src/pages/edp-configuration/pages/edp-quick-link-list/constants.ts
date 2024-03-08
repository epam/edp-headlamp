import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const QUICK_LINK_LIST_PAGE_DESCRIPTION: PageDescription = {
  id: 'quick-links',
  label: 'Links',
  description: 'Configure links for quick access to required tools.',
  docLink: EDP_USER_GUIDE.OVERVIEW.url,
  routePath: '/configuration/quicklinks',
};
