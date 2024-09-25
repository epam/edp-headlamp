import React from 'react';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const useDefaultValues = () => {
  const {
    props: { CDPipelineData },
  } = useCurrentDialog();

  return React.useMemo(
    () => ({
      [CDPIPELINE_FORM_NAMES.namespace.name]: CDPipelineData?.metadata.namespace,
      [CDPIPELINE_FORM_NAMES.applications.name]: CDPipelineData?.spec.applications,
      [CDPIPELINE_FORM_NAMES.applicationsToPromote.name]:
        CDPipelineData?.spec.applicationsToPromote,
      [CDPIPELINE_FORM_NAMES.inputDockerStreams.name]: CDPipelineData?.spec.inputDockerStreams,
      [CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name]: CDPipelineData?.spec.applications.map(
        (app) => app
      ),
      [CDPIPELINE_FORM_NAMES.applicationsFieldArray.name]: CDPipelineData?.spec.applications.map(
        (app) => ({
          appName: app,
          appBranch: {
            label: '',
            value: undefined,
          },
          appToPromote: undefined,
        })
      ),
    }),
    [
      CDPipelineData?.metadata.namespace,
      CDPipelineData?.spec.applications,
      CDPipelineData?.spec.applicationsToPromote,
      CDPipelineData?.spec.inputDockerStreams,
    ]
  );
};
