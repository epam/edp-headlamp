import React from 'react';
import { DEFAULT_CLUSTER } from '../../../../../../constants/clusters';
import { TRIGGER_TYPE } from '../../../../../../constants/triggerTypes';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { STAGE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { DEFAULT_QUALITY_GATE } from '../../fields/QualityGates/constants';

export const useDefaultValues = () => {
  const {
    props: { CDPipelineData, otherStages },
    extra: { cleanTriggerTemplateList, deployTriggerTemplateList },
  } = useCurrentDialog();

  const stagesQuantity = otherStages.length;
  const namespace = CDPipelineData?.metadata.namespace || getDefaultNamespace();
  const CDPipelineName = CDPipelineData?.metadata.name;

  return React.useMemo(
    () => ({
      [STAGE_FORM_NAMES.order.name]: stagesQuantity,
      [STAGE_FORM_NAMES.triggerType.name]: TRIGGER_TYPE.MANUAL,
      [STAGE_FORM_NAMES.sourceLibraryName.name]: 'default',
      [STAGE_FORM_NAMES.sourceType.name]: 'default',
      [STAGE_FORM_NAMES.cluster.name]: DEFAULT_CLUSTER,
      [STAGE_FORM_NAMES.qualityGates.name]: [DEFAULT_QUALITY_GATE],
      [STAGE_FORM_NAMES.deployNamespace.name]: `${namespace}-${CDPipelineName}`,
      [STAGE_FORM_NAMES.triggerTemplate.name]:
        deployTriggerTemplateList.data?.items?.[0]?.metadata.name,
      [STAGE_FORM_NAMES.cleanTemplate.name]:
        cleanTriggerTemplateList.data?.items?.[0]?.metadata.name,
    }),
    [
      CDPipelineName,
      cleanTriggerTemplateList.data?.items,
      deployTriggerTemplateList.data?.items,
      namespace,
      stagesQuantity,
    ]
  );
};
