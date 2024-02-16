import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const GIT_SERVER_LIST_PAGE_DESCRIPTION: PageDescription = {
  label: 'Git Servers',
  description: 'Integrate platform with Version Control Systems.',
  docLink: EDP_USER_GUIDE.GIT_SERVER_MANAGE.anchors.VIEW_DATA.url,
  routePath: '/configuration/gitservers',
};
