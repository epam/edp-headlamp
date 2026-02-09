import { CodebaseBranchKubeObjectInterface } from '../../../../../../../../../../k8s/groups/EDP/CodebaseBranch/types';

export interface GitLabBuildGroupProps {
  codebaseBranch: CodebaseBranchKubeObjectInterface;
  handleOpenGitLabParamsDialog: () => void;
  handleDirectGitLabBuild: () => void;
  menuAnchorEl: HTMLElement | null;
  handleClickMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseMenu: () => void;
  isGitLabLoading: boolean;
}
