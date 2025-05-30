import { ApiServiceBase, GitFusionApiService } from '../../../../../services/api';
import { ManageCodebaseDialogProps } from '../../types';

export interface CurrentDialogContextProviderProps extends ManageCodebaseDialogProps {}

export interface CurrentDialogContextProviderValue extends CurrentDialogContextProviderProps {
  apiServiceBase: ApiServiceBase;
  gitFusionApiService: GitFusionApiService;
}
