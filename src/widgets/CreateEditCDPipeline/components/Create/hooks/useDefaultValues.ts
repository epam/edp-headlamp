import React from 'react';
import { DEPLOYMENT_TYPES } from '../../../../../constants/deploymentTypes';
import { CDPIPELINE_FORM_NAMES } from '../../../names';

export const useDefaultValues = () => {
    return React.useMemo(
        () => ({
            [CDPIPELINE_FORM_NAMES.applications.name]: [],
            [CDPIPELINE_FORM_NAMES.applicationsToPromote.name]: [],
            [CDPIPELINE_FORM_NAMES.inputDockerStreams.name]: [],
            [CDPIPELINE_FORM_NAMES.deploymentType.name]: DEPLOYMENT_TYPES.CONTAINER,
        }),
        []
    );
};
