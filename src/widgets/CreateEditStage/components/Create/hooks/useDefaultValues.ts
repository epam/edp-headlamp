import React from 'react';
import { DEFAULT_CLUSTER } from '../../../../../constants/clusters';
import { JOB_PROVISIONERS } from '../../../../../constants/jobProvisioners';
import { TRIGGER_TYPES } from '../../../../../constants/triggerTypes';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../constants';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageDialogForwardedProps } from '../../../types';

export const useDefaultValues = () => {
    const { dialogProviderState } = useDialogContext<CreateEditStageDialogForwardedProps>();
    const otherStages =
        dialogProviderState?.[CREATE_EDIT_STAGE_DIALOG_NAME].forwardedProps?.otherStages;
    const stagesQuantity = otherStages.length;

    return React.useMemo(
        () => ({
            [STAGE_FORM_NAMES.order.name]: stagesQuantity,
            [STAGE_FORM_NAMES.triggerType.name]: TRIGGER_TYPES.MANUAL,
            [STAGE_FORM_NAMES.jobProvisioning.name]: JOB_PROVISIONERS.DEFAULT,
            [STAGE_FORM_NAMES.sourceLibraryName.name]: 'default',
            [STAGE_FORM_NAMES.sourceType.name]: 'default',
            [STAGE_FORM_NAMES.cluster.name]: DEFAULT_CLUSTER,
        }),
        [stagesQuantity]
    );
};
