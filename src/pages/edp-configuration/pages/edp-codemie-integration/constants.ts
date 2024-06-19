import { PageDescription } from '../../../../types/pages';
import { routeEDPCodeMieIntegration } from './route';

export const CODEMIE_INTEGRATION_PAGE_DESCRIPTION: PageDescription = {
  id: 'codemie-integration',
  label: 'CodeMie',
  description: 'Configure CodeMie integration.',
  routePath: routeEDPCodeMieIntegration.path,
  // docLink: EDP_OPERATOR_GUIDE.ARGO_CD.url,
};
