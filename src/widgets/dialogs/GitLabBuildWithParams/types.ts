import { GitLabPipelineTriggerData } from '../../../hooks/useCreateGitLabPipeline/types';

export interface GitLabBuildWithParamsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: GitLabPipelineTriggerData) => void;
  triggerData: Omit<GitLabPipelineTriggerData, 'variables'>;
  isLoading?: boolean;
}
