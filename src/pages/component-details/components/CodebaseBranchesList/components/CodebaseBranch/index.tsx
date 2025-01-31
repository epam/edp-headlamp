import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, alpha } from '@mui/material';
import React from 'react';
import { PIPELINE_TYPE } from '../../../../../../constants/pipelineTypes';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../../../../../k8s/groups/Tekton/PipelineRun';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../../../../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/PipelineRun/types';
import { sortKubeObjectByCreationTimestamp } from '../../../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../../../utils/styling/rem';
import { useDynamicDataContext } from '../../../../providers/DynamicData/hooks';
import { Details } from './components/Details';
import { Summary } from './components/Summary';
import { CodebaseBranchProps } from './types';

export const CodebaseBranch = ({
  codebaseBranchData,
  expandedPanel,
  id,
  handlePanelChange,
}: CodebaseBranchProps) => {
  const {
    component: { data: codebaseData },
  } = useDynamicDataContext();

  const [pipelineRuns, setPipelineRuns] = React.useState<{
    all: PipelineRunKubeObjectInterface[];
    latestBuildPipelineRun: PipelineRunKubeObjectInterface;
  }>({
    all: null,
    latestBuildPipelineRun: null,
  });

  const [error, setError] = React.useState<Error>(null);

  const handleStorePipelineRuns = React.useCallback(
    (socketPipelineRuns: PipelineRunKubeObjectInterface[]) => {
      const sortedPipelineRuns = socketPipelineRuns.sort(sortKubeObjectByCreationTimestamp);

      if (sortedPipelineRuns.length === 0) {
        setPipelineRuns({
          all: [],
          latestBuildPipelineRun: undefined,
        });
        return;
      }

      const [latestBuildPipelineRun] = sortedPipelineRuns;

      if (
        PipelineRunKubeObject.parseStatusReason(latestBuildPipelineRun) ===
        PipelineRunKubeObject.parseStatusReason(pipelineRuns.latestBuildPipelineRun)
      ) {
        return;
      }

      setPipelineRuns({
        all: sortedPipelineRuns,
        latestBuildPipelineRun,
      });
    },
    [pipelineRuns.latestBuildPipelineRun]
  );

  const handleStreamError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  const normalizedCodebaseBranchName = codebaseBranchData.metadata.name.replaceAll('/', '-');

  PipelineRunKubeObject.useApiList(handleStorePipelineRuns, handleStreamError, {
    namespace: codebaseBranchData.metadata.namespace,
    labelSelector: `${PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE}=${PIPELINE_TYPE.BUILD},${PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH}=${normalizedCodebaseBranchName}`,
  });

  return (
    <div style={{ paddingBottom: rem(16) }}>
      <Accordion expanded={expandedPanel === id} onChange={handlePanelChange(id)}>
        <AccordionSummary
          expandIcon={<Icon icon={ICONS.ARROW_DOWN} width={20} height={20} />}
          sx={{
            padding: (t) => `${t.typography.pxToRem(8)} ${t.typography.pxToRem(24)}`,
            borderBottom: (t) => `1px solid ${alpha(t.palette.common.black, 0.2)}`,

            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
            '& .MuiAccordionSummary-content.Mui-expanded': {
              margin: 0,
            },
          }}
        >
          <Summary codebaseBranchData={codebaseBranchData} pipelineRuns={pipelineRuns} />
        </AccordionSummary>
        <AccordionDetails>
          <Details codebaseData={codebaseData} pipelineRuns={pipelineRuns} error={error} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
