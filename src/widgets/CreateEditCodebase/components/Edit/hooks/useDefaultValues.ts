import React from 'react';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../constants';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { EditCodebaseFormDialogForwardedProps } from '../types';

export const useDefaultValues = () => {
    const { dialogProviderState } = useDialogContext<EditCodebaseFormDialogForwardedProps>();

    const codebaseData =
        dialogProviderState?.[CREATE_EDIT_CODEBASE_DIALOG_NAME].forwardedProps?.codebaseData;

    return React.useMemo(
        () => ({
            [CODEBASE_FORM_NAMES.hasJiraServerIntegration.name]: !!codebaseData?.spec.jiraServer,
            [CODEBASE_FORM_NAMES.namespace.name]: codebaseData?.metadata.namespace,
            [CODEBASE_FORM_NAMES.jiraServer.name]: codebaseData?.spec.jiraServer,
            [CODEBASE_FORM_NAMES.commitMessagePattern.name]:
                codebaseData?.spec.commitMessagePattern,
            [CODEBASE_FORM_NAMES.ticketNamePattern.name]: codebaseData?.spec.ticketNamePattern,
            [CODEBASE_FORM_NAMES.jiraIssueMetadataPayload.name]:
                codebaseData?.spec.jiraIssueMetadataPayload,
        }),
        [codebaseData]
    );
};
