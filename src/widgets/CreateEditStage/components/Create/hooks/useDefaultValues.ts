import React from 'react';
import { DEFAULT_CLUSTER } from '../../../../../constants/clusters';
import { TRIGGER_TYPES } from '../../../../../constants/triggerTypes';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../constants';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageDialogForwardedProps } from '../../../types';
import { DEFAULT_QUALITY_GATE } from '../../fields/QualityGates/constants';

export const useDefaultValues = () => {
    const {
        forwardedProps: { CDPipelineData, otherStages },
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );

    const stagesQuantity = otherStages.length;
    const namespace = CDPipelineData.metadata.namespace || getDefaultNamespace();
    const CDPipelineName = CDPipelineData.metadata.name;

    return React.useMemo(
        () => ({
            [STAGE_FORM_NAMES.order.name]: stagesQuantity,
            [STAGE_FORM_NAMES.triggerType.name]: TRIGGER_TYPES.MANUAL,
            [STAGE_FORM_NAMES.sourceLibraryName.name]: 'default',
            [STAGE_FORM_NAMES.sourceType.name]: 'default',
            [STAGE_FORM_NAMES.cluster.name]: DEFAULT_CLUSTER,
            [STAGE_FORM_NAMES.qualityGates.name]: [DEFAULT_QUALITY_GATE],
            [STAGE_FORM_NAMES.deployNamespace.name]: `${namespace}-${CDPipelineName}`,
        }),
        [CDPipelineName, namespace, stagesQuantity]
    );
};
