import React from 'react';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../constants';
import { STAGE_FORM_NAMES } from '../../../names';
import { CreateEditStageDialogForwardedProps } from '../../../types';

export const useDefaultValues = () => {
    const {
        forwardedProps: { stage },
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );
    return React.useMemo(
        () => ({
            [STAGE_FORM_NAMES.triggerType.name]: stage?.spec.triggerType,
        }),
        [stage]
    );
};
