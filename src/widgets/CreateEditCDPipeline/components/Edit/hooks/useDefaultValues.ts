import React from 'react';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import { CreateEditCDPipelineDialogForwardedProps } from '../../../types';

export const useDefaultValues = () => {
  const {
    forwardedProps: { CDPipelineData },
  } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );

  return React.useMemo(
    () => ({
      [CDPIPELINE_FORM_NAMES.namespace.name]: CDPipelineData.metadata.namespace,
      [CDPIPELINE_FORM_NAMES.applications.name]: CDPipelineData.spec.applications,
      [CDPIPELINE_FORM_NAMES.applicationsToPromote.name]: CDPipelineData.spec.applicationsToPromote,
      [CDPIPELINE_FORM_NAMES.inputDockerStreams.name]: CDPipelineData.spec.inputDockerStreams,
    }),
    [CDPipelineData]
  );
};
