import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
}

export const useDefaultValues = ({
    names,
    codebaseData,
}: UseDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.hasJiraServerIntegration.name]: !!codebaseData.spec.jiraServer,
            [names.namespace.name]: codebaseData.metadata.namespace,
            [names.jiraServer.name]: codebaseData.spec.jiraServer,
            [names.commitMessagePattern.name]: codebaseData.spec.commitMessagePattern,
            [names.ticketNamePattern.name]: codebaseData.spec.ticketNamePattern,
            [names.jiraIssueMetadataPayload.name]: codebaseData.spec.jiraIssueMetadataPayload,
        };
    }, [codebaseData, names]);

    return { baseDefaultValues };
};
