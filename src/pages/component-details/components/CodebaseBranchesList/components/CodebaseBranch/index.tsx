import { Icon } from '@iconify/react';
import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Accordion, AccordionDetails, AccordionSummary, alpha } from '@mui/material';
import React from 'react';
import { PIPELINE_TYPE } from '../../../../../../constants/pipelineTypes';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../../../../../k8s/groups/Tekton/PipelineRun';
import { useCreateBuildPipelineRun } from '../../../../../../k8s/groups/Tekton/PipelineRun/hooks/useCreateBuildPipelineRun';
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
    all: PipelineRunKubeObjectInterface[] | null | undefined;
    latestBuildPipelineRun: PipelineRunKubeObjectInterface | null | undefined;
  }>({
    all: null,
    latestBuildPipelineRun: null,
  });

  const [error, setError] = React.useState<Error | null>(null);

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

      const [latestBuildPipelineRun] = sortedPipelineRuns.filter(
        (el) =>
          el.metadata.labels?.[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] === PIPELINE_TYPE.BUILD
      );

      setPipelineRuns({
        all: sortedPipelineRuns,
        latestBuildPipelineRun,
      });
    },
    []
  );

  const handleStreamError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  const normalizedCodebaseBranchName = codebaseBranchData.metadata.name.replaceAll('/', '-');

  PipelineRunKubeObject.useApiList(handleStorePipelineRuns, handleStreamError, {
    namespace: codebaseBranchData.metadata.namespace,
    labelSelector: `${PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH}=${normalizedCodebaseBranchName}`,
  });

  const { createBuildPipelineRun } = useCreateBuildPipelineRun({});

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(menuAnchorEl ? null : event.currentTarget);
  };

  const handleCloseMenu = () => setMenuAnchorEl(null);

  const [editor, setEditor] = React.useState<{
    open: boolean;
    data: KubeObjectInterface | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const handleOpenEditor = (data: KubeObjectInterface) => {
    setEditor({ open: true, data });
  };

  const handleCloseEditor = () => {
    setEditor({ open: false, data: undefined });
  };

  const handleEditorSave = (data: KubeObjectInterface[]) => {
    const [item] = data;

    handleCloseMenu();

    createBuildPipelineRun(item);

    handleCloseEditor();
  };

  return (
    <>
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
            <Summary
              codebaseBranchData={codebaseBranchData}
              latestBuildPipelineRun={pipelineRuns.latestBuildPipelineRun}
              createBuildPipelineRun={createBuildPipelineRun}
              menuAnchorEl={menuAnchorEl}
              handleClickMenu={handleClickMenu}
              handleCloseMenu={handleCloseMenu}
              handleOpenEditor={handleOpenEditor}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Details codebaseData={codebaseData!} pipelineRuns={pipelineRuns.all} error={error} />
          </AccordionDetails>
        </Accordion>
      </div>
      {editor.open && editor.data && (
        <EditorDialog
          open={editor.open}
          item={editor.data}
          onClose={handleCloseEditor}
          onSave={handleEditorSave}
        />
      )}
    </>
  );
};
