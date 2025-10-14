import React from 'react';
import { CI_TOOL } from '../../../../../../../../constants/ciTools';
import { useDynamicDataContext } from '../../../../../../providers/DynamicData/hooks';
import { GitLabBuildGroup } from './components/GitLabBuildGroup';
import { TektonBuildGroup } from './components/TektonBuildGroup';
import { BuildGroupProps } from './types';

export const BuildGroup: React.FC<BuildGroupProps> = ({
  codebaseBranch,
  latestBuildPipelineRun,
  handleOpenEditor,
  handleOpenGitLabParamsDialog,
  handleDirectGitLabBuild,
  menuAnchorEl,
  handleClickMenu,
  handleCloseMenu,
  createBuildPipelineRun,
  isGitLabLoading,
}) => {
  const {
    component: { data: codebaseData },
  } = useDynamicDataContext();

  const ciTool = codebaseData?.spec.ciTool || CI_TOOL.TEKTON;

  if (ciTool === CI_TOOL.GITLAB) {
    return (
      <GitLabBuildGroup
        codebaseBranch={codebaseBranch}
        handleOpenGitLabParamsDialog={handleOpenGitLabParamsDialog}
        handleDirectGitLabBuild={handleDirectGitLabBuild}
        menuAnchorEl={menuAnchorEl}
        handleClickMenu={handleClickMenu}
        handleCloseMenu={handleCloseMenu}
        isGitLabLoading={isGitLabLoading}
      />
    );
  }

  return (
    <TektonBuildGroup
      codebaseBranch={codebaseBranch}
      latestBuildPipelineRun={latestBuildPipelineRun}
      handleOpenEditor={handleOpenEditor}
      menuAnchorEl={menuAnchorEl}
      handleClickMenu={handleClickMenu}
      handleCloseMenu={handleCloseMenu}
      createBuildPipelineRun={createBuildPipelineRun}
    />
  );
};
