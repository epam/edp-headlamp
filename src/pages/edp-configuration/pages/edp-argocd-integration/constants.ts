import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const ARGOCD_INTEGRATION_PAGE_DESCRIPTION: PageDescription = {
  id: 'argocd-integration',
  label: 'Argo CD',
  description: 'Configure Argo CD integration.',
  routePath: '/configuration/argocd-integration',
  docLink: EDP_OPERATOR_GUIDE.ARGO_CD.url,
};
