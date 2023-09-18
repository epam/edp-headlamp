import React from 'react';
import { ECR_SERVICE_ACCOUNT_FORM_NAMES } from '../names';
import { ManageECRServiceAccountFormDataContext } from '../types';

export const useDefaultValues = ({
    formData,
}: {
    formData: ManageECRServiceAccountFormDataContext;
}) => {
    const { currentElement, registryEndpoint: dockerRegistryEndpoint } = formData;

    return React.useMemo(() => {
        const irsaRoleArn = currentElement?.metadata?.annotations?.['eks.amazonaws.com/role-arn'];

        return {
            [ECR_SERVICE_ACCOUNT_FORM_NAMES.registryEndpoint.name]: dockerRegistryEndpoint,
            [ECR_SERVICE_ACCOUNT_FORM_NAMES.irsaRoleArn.name]: irsaRoleArn,
        };
    }, [currentElement, dockerRegistryEndpoint]);
};
