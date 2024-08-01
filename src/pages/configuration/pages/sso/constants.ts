import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'sso-integration',
  label: 'SSO',
  description: 'Integrate platform with Identity Provider to enable Single sign-on approach.',
  routePath: '/configuration/sso-integration',
  docLink: EDP_OPERATOR_GUIDE.O_AUTH.url,
};
