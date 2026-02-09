import React from 'react';
import { CODEBASE_LABEL_SELECTOR_CODEMIE_INTEGRATION } from '../../../../../../k8s/groups/EDP/Codebase/labels';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { createAdvancedMappingRowName } from '../../fields/AdvancedJiraMapping/constants';
import { getJiraIssueMetadataPayloadDefaultValue } from '../../fields/AdvancedJiraMapping/utils';

export const useDefaultValues = () => {
  const {
    props: { codebaseData },
  } = useCurrentDialog();

  const mappingRows = getJiraIssueMetadataPayloadDefaultValue(
    codebaseData?.spec.jiraIssueMetadataPayload
  );

  return React.useMemo(
    () => ({
      [CODEBASE_FORM_NAMES.hasJiraServerIntegration.name]: !!codebaseData?.spec.jiraServer,
      [CODEBASE_FORM_NAMES.namespace.name]: codebaseData?.metadata.namespace,
      [CODEBASE_FORM_NAMES.jiraServer.name]: codebaseData?.spec.jiraServer,
      [CODEBASE_FORM_NAMES.commitMessagePattern.name]: codebaseData?.spec.commitMessagePattern,
      [CODEBASE_FORM_NAMES.ticketNamePattern.name]: codebaseData?.spec.ticketNamePattern,
      [CODEBASE_FORM_NAMES.codemieIntegrationLabel.name]:
        codebaseData?.metadata.labels?.[CODEBASE_LABEL_SELECTOR_CODEMIE_INTEGRATION],
      [CODEBASE_FORM_NAMES.hasCodemieIntegration.name]:
        !!codebaseData?.metadata.labels?.[CODEBASE_LABEL_SELECTOR_CODEMIE_INTEGRATION],
      [CODEBASE_FORM_NAMES.jiraIssueMetadataPayload.name]:
        codebaseData?.spec.jiraIssueMetadataPayload,
      ...mappingRows.reduce(
        (acc, { value, jiraPattern }) => ({
          ...acc,
          [createAdvancedMappingRowName(value)]: jiraPattern,
        }),
        {}
      ),
    }),
    [codebaseData, mappingRows]
  );
};
