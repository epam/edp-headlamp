import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION: PageDescription = {
  id: 'defect-dojo-integration',
  label: 'DefectDojo',
  description: 'Manage and correlate your security findings with DefectDojo.',
  routePath: '/configuration/defect-dojo-integration',
  docLink: EDP_OPERATOR_GUIDE.DEFECT_DOJO.url,
};
