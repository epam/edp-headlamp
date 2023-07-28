import React from 'react';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../constants';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageDialogForwardedProps } from '../../../types';

export const useDefaultValues = () => {
    const { dialogProviderState } = useDialogContext<CreateEditStageDialogForwardedProps>();
    const stage = dialogProviderState?.[CREATE_EDIT_STAGE_DIALOG_NAME].forwardedProps?.stage;
    return React.useMemo(
        () => ({
            [STAGE_FORM_NAMES.triggerType.name]: stage?.spec.triggerType,
        }),
        [stage]
    );
};
